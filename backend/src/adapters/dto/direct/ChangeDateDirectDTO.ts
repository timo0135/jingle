import DTO from "../DTO";
import Direct from "../../../core/domain/entities/direct/Direct";

class ChangeDateDirectDTO extends DTO{
    protected direct: Direct;
    protected date: Date;
    constructor(direct: Direct, date: Date) {
        super();
        this.direct = direct;
        this.date = date;
    }
}

export default ChangeDateDirectDTO;
