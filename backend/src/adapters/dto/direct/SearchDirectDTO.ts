import DTO from "../DTO";
import Direct from "../../../core/domain/entities/direct/Direct";

class SearchDirectDTO extends DTO{
    protected info: string;
    protected direct: Direct;

    constructor(info: string, direct: Direct) {
        super();
        this.info = info;
        this.direct = direct;
    }
}

export default SearchDirectDTO;
