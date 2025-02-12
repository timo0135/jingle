import FileServiceInterface from "../../core/use_cases/file/FileServiceInterface";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

const DIRECTUS_URL = process.env.DIRECTUS_URL; // URL de ton Directus
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Email de l'admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Mot de passe de l'admin

class FileServiceHTTP implements FileServiceInterface {

    private token: Promise<string> = this.getAdminToken();

    private async getAdminToken(): Promise<string> {
        const response = await axios.post(`${DIRECTUS_URL}/auth/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        }, {
            headers: { "Content-Type": "application/json" }
        });

        return response.data.data.access_token;
    }
    async uploadFile(req: Request): Promise<string> {
        const token = await this.token;
        if (req.file && req.file.path) {
            const filePath: string = req.file.path;
            const fileUpload = new FormData();
            fileUpload.append("file", fs.createReadStream(filePath), {
                filename: req.file.originalname,
                contentType: 'audio/mpeg'
            });

            try {
                const directusResponse = await axios.post(
                    "http://directus:8055/files",
                    fileUpload,
                    {
                        headers: {
                            ...fileUpload.getHeaders(),
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                fs.unlinkSync(filePath);
                return `/assets/${directusResponse.data.data.id}`;
            } catch (error) {
                console.error("Error uploading file:", error);
                fs.unlinkSync(filePath);
                return "";
            }
        }else {
            return "";
        }
    }
}

export default FileServiceHTTP;
