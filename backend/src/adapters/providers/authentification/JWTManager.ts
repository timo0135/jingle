import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

class JWTManager {
    constructor() {
        dotenv.config();
    }
    public createAccessToken(payload: object): string {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!);
    }

    public createRefreshToken(payload: object): string {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!);
    }

    public decodeToken(token: string): object | string {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    }
}

export default JWTManager;
