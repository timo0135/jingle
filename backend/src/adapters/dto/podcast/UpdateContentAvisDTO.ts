import DTO from "../DTO";
import Avis from "../../../core/domain/entities/avis/Avis";

class UpdateContentAvisDTO extends DTO{
    protected content: string;
    protected avis: Avis;

    constructor(content: string, avis: Avis) {
        super();
        this.content = content;
        this.avis = avis;
    }
}

export default UpdateContentAvisDTO;
