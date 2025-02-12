import DisplayUserDTO from "../src/adapters/dto/user/DisplayUserDTO";

declare global {
    namespace Express {
        interface Request {
            auth: DisplayUserDTO;
            file?: Express.Multer.File;
            files?: { [key: string]: Express.Multer.File[] };
        }
    }
}
