import DTO from "../DTO";
import Direct from "../../../core/domain/entities/direct/Direct";

class ChangeImageDirectDTO extends DTO{
    protected image: string;
    protected direct: Direct;

    constructor(image: string, direct: Direct) {
        super();
        this.image = image;
        this.direct = direct;
    }
}

export default ChangeImageDirectDTO;
