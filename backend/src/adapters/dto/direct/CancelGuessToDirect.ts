import DTO from "../DTO";
import Direct from "../../../core/entities/direct/Direct";
import User from "../../../core/entities/user/User";
import {IsNotEmpty} from "class-validator";

class CancelGuessToDirect extends DTO{

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

export default CancelGuessToDirect;
