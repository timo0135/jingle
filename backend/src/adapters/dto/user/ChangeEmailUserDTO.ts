import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import {IsNotEmpty} from "class-validator";

class ChangeEmailUserDTO extends DTO{

    @IsNotEmpty()
    protected user: User;

    @IsNotEmpty()
    protected email: string;

    constructor(user: User, email: string) {
        super();
        this.user = user;
        this.email = email;
    }
}

export default ChangeEmailUserDTO;
