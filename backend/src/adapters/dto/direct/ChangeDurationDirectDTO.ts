import DTO from "../DTO";
import Direct from "../../../core/domain/entities/direct/Direct";

class ChangeDurationDirectDTO extends DTO{
    protected duration: number;
    protected direct: Direct;

    constructor(duration: number, direct: Direct) {
        super();
        this.duration = duration;
        this.direct = direct;
    }
}

export default ChangeDurationDirectDTO;
