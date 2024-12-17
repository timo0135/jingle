import DTO from "../DTO";
import Direct from "../../../core/domain/entities/direct/Direct";

class ChangeNameDirectDTO extends DTO{
    protected name: string;
    protected direct: Direct
    constructor(name: string, direct: Direct) {
        super();
        this.name = name;
        this.direct = direct;
    }
}

export default ChangeNameDirectDTO;
