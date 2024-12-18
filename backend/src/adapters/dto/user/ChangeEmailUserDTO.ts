import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class ChangeEmailUserDTO extends DTO{

    @IsNotEmpty()
    protected userId: string;

    @IsNotEmpty()
    protected email: string;

    constructor(userId: string, email: string) {
        super();
        this.userId = userId;
        this.email = email;
    }
}

export default ChangeEmailUserDTO;
