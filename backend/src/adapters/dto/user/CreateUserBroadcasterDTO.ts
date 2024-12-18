import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class CreateUserBroadcasterDTO extends DTO{

    @IsNotEmpty()
    protected email: string;

    @IsNotEmpty()
    protected password: string;

    @IsNotEmpty()
    protected pseudo: string;
    protected role: number = 2;

    constructor(email: string, password: string, pseudo: string) {
        super();
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
    }
}

export default CreateUserBroadcasterDTO;
