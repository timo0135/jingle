import DisplayUserDTO from "../../dto/user/DisplayUserDTO";

interface AuthProviderInterface {
    register(email: string, pseudo: string, password: string): Promise<DisplayUserDTO>;
    signin(password: string, email?: string, pseudo?: string): Promise<DisplayUserDTO>;
    refresh(token: string): Promise<DisplayUserDTO>;
    getSignedInUser(token: string): Promise<DisplayUserDTO>;
}

export default AuthProviderInterface;
