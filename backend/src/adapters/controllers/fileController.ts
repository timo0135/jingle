import { Request, Response } from 'express';
import PodcastServiceNotFoundException from "../../core/use_cases/podcast/PodcastServiceNotFoundException";
import PodcastServiceBadDataException from "../../core/use_cases/podcast/PodcastServiceBadDataException";
import PodcastServiceInternalServerErrorException
    from "../../core/use_cases/podcast/PodcastServiceInternalServerErrorException";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const DIRECTUS_URL = process.env.DIRECTUS_URL; // URL de ton Directus
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Email de l'admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Mot de passe de l'admin

async function getAdminToken(): Promise<string> {
    const response = await axios.post(`${DIRECTUS_URL}/auth/login`, {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
    }, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data.data.access_token;
}

export async function getFiles(req: Request, res: Response) {
    try {
        const token = await getAdminToken();
        const response = await axios.get(
            `${DIRECTUS_URL}/assets/${req.params.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'arraybuffer'
            }
        );

        const contentType = response.headers['content-type'];
        res.setHeader('Content-Type', contentType);
        res.status(200);
        res.send(response.data);

    } catch (error) {
        handleError(res, error);
    }
}

function handleError(res: Response, error: any) {
    if (error instanceof PodcastServiceNotFoundException) {
        res.status(404).json({ message: error.message });
    } else if (error instanceof PodcastServiceBadDataException) {
        res.status(400).json({ message: error.message });
    } else if (error instanceof PodcastServiceInternalServerErrorException) {
        res.status(500).json({ message: error.message });
    } else {
        console.error(error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}
