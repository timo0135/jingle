import DTO from "../DTO";
import Avis from "../../../core/domain/entities/avis/Avis";

class SearchAvisDTO extends DTO{
    protected info: string;
    protected avis: Avis;
    constructor(info: string, avis: Avis) {
        super();
        this.info = info;
        this.avis = avis;
    }
}

export default SearchAvisDTO;
