import DTO from "../DTO";

class SearchAvisDTO extends DTO{
    protected info: string;
    protected avisId: string;
    constructor(info: string, avisId: string) {
        super();
        this.info = info;
        this.avisId = avisId;
    }
}

export default SearchAvisDTO;
