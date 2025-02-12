import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { WebSocketServer, WebSocket } from "ws";
import podcastRoute from "./adapters/routes/podcastRoute";
import userRoute from "./adapters/routes/userRoute";
import playlistRoute from "./adapters/routes/playlistRoute";
import directRoute from "./adapters/routes/directRoute";
import musicRoute from "./adapters/routes/musicRoute";
import fileRoute from "./adapters/routes/fileRoute";
import multer from "multer";
import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
const options = {
    origin: process.env.FRONTEND_URL,
};
app.use(cors(options));
app.use(express.json());
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Récupère l'extension
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

app.use(upload.fields([
    { name: "file", maxCount: 1 },       // Audio
    { name: "fileImage", maxCount: 1 }   // Image
]));



const server = app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});

app.get("/", (req, res) => {
    res.json({ message: "ça marche !" });
});

app.use("/", podcastRoute);
app.use("/", userRoute);
app.use("/", playlistRoute);
app.use("/", directRoute);
app.use("/", musicRoute);
app.use("/", fileRoute);

const wss = new WebSocketServer({ server });

interface ExtendedWebSocket extends WebSocket {
    isBroadcaster?: boolean;
}

let broadcaster: ExtendedWebSocket | null = null;
const listeners = new Set<ExtendedWebSocket>();

wss.on('connection', (ws: ExtendedWebSocket) => {
    ws.on('message', (message: string) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'broadcast') {
                broadcaster = ws;
                ws.isBroadcaster = true;
                console.log("Broadcaster connected");
            } else if (data.type === 'listen') {
                listeners.add(ws);
                console.log("Listener connected. Total listeners:", listeners.size);
            } else if (data.type === 'audio') {
                if (ws.isBroadcaster) {
                    // Forward audio data to all listeners
                    listeners.forEach(listener => {
                        if (listener.readyState === WebSocket.OPEN) {
                            listener.send(JSON.stringify({ audio: data.audio }));
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });

    ws.on('close', (code, reason) => {
        if (ws.isBroadcaster) {
            broadcaster = null;
            console.log("Broadcaster disconnected");
        } else {
            listeners.delete(ws);
            console.log("Listener disconnected. Remaining listeners:", listeners.size);
        }
        console.log("WebSocket closed with code:", code, "Reason:", reason);
    });
});
