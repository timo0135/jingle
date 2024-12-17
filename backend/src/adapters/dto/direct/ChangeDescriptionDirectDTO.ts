import DTO from "../DTO";
import Direct from "../../../core/domain/entities/direct/Direct";

class ChangeDescriptionDirectDTO extends DTO{
    protected description: string;
    protected direct: Direct;

    constructor(description: string, direct: Direct) {
        super();
        this.description = description;
        this.direct = direct;
    }
}

export default ChangeDescriptionDirectDTO;
