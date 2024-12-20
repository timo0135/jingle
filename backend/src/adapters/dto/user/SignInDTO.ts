import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class SignInDTO extends DTO{
    protected email: string;
    protected pseudo: string;
    @IsNotEmpty()
    protected password: string;

    constructor(email: string, pseudo: string ,password: string){
        super();
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
    }

}

export default SignInDTO;
