import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class InviteGuessToDirectDTO extends DTO {

    @IsNotEmpty()
    protected directId : string;

    @IsNotEmpty()
    protected guessId: string;

    constructor(directId: string, guessId: string) {
        super();
        this.directId = directId;
        this.guessId = guessId;
    }
}

export default InviteGuessToDirectDTO;
