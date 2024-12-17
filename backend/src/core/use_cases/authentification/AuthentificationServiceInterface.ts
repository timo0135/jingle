import DisplayUserDTO from "../../../adapters/dto/user/DisplayUserDTO";

interface AuthentificationServiceInterface {
    credentials(email: string | null, pseudo: string | null, password: string): Promise<DisplayUserDTO>;
    register(email: string, pseudo: string, password: string): Promise<DisplayUserDTO>;
    getUser(id: string): Promise<DisplayUserDTO>;
    getUserByPseudo(pseudo: string): Promise<DisplayUserDTO>;
    getUserByEmail(email: string): Promise<DisplayUserDTO>;
}

export default AuthentificationServiceInterface;
