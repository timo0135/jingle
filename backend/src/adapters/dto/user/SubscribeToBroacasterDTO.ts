import {IsNotEmpty} from "class-validator";
import DTO from "../DTO";

class SubscribeToBroacasterDTO extends DTO {
    @IsNotEmpty()
    protected broadcasterId: string;

    @IsNotEmpty()
    protected userId: string;

    constructor(broadcasterId: string, userId: string) {
        super();
        this.broadcasterId = broadcasterId;
        this.userId = userId;
    }
}

export default SubscribeToBroacasterDTO;
