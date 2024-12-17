import {IsNotEmpty} from "class-validator";
import DTO from "../DTO";
import User from "../../../core/entities/user/User";

class SubscribeToBroacasterDTO extends DTO {
    @IsNotEmpty()
    protected broadcaster: User;

    @IsNotEmpty()
    protected user: User;

    constructor(broadcaster: User, user: User) {
        super();
        this.broadcaster = broadcaster;
        this.user = user;
    }
}

export default SubscribeToBroacasterDTO;
