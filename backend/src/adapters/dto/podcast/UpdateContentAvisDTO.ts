import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class UpdateContentAvisDTO extends DTO{
    @IsNotEmpty()
    protected content: string;
    @IsNotEmpty()
    protected avisId: string;

    constructor(content: string, avisId: string) {
        super();
        this.content = content;
        this.avisId = avisId;
    }
}

export default UpdateContentAvisDTO;
