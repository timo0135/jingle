import DTO from "../DTO";
import Direct from "../../../core/domain/entities/direct/Direct";
import User from "../../../core/domain/entities/user/User";
import {IsNotEmpty} from "class-validator";

class InviteGuessToDirectDTO extends DTO {

    @IsNotEmpty()
    protected direct : Direct;

    @IsNotEmpty()
    protected guess: User;

    constructor(direct: Direct, guess: User) {
        super();
        this.direct = direct;
        this.guess = guess;
    }
}

export default InviteGuessToDirectDTO;
