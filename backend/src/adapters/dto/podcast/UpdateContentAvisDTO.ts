import DTO from "../DTO";

class UpdateContentAvisDTO extends DTO{
    protected content: string;
    protected avisId: string;

    constructor(content: string, avisId: string) {
        super();
        this.content = content;
        this.avisId = avisId;
    }
}

export default UpdateContentAvisDTO;
