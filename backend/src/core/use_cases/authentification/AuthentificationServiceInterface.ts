import DisplayUserDTO from "../../../adapters/dto/user/DisplayUserDTO";

interface AuthentificationServiceInterface {
    credentials(password: string, email?: string, pseudo?: string): Promise<DisplayUserDTO>;
    register(email: string, pseudo: string, password: string): Promise<DisplayUserDTO>;
    getUser(id: string): Promise<DisplayUserDTO>;
    getUserByPseudo(pseudo: string): Promise<DisplayUserDTO>;
    getUserByEmail(email: string): Promise<DisplayUserDTO>;
    updateUserEmail(id: string, email: string): Promise<DisplayUserDTO>;
    updateUserPseudo(id: string, pseudo: string): Promise<DisplayUserDTO>;
    getAllUsers(): Promise<DisplayUserDTO[]>;
}

export default AuthentificationServiceInterface;
