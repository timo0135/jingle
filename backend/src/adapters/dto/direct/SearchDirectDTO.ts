import DTO from "../DTO";

class SearchDirectDTO extends DTO{
    protected info: string;
    protected directId: string;

    constructor(info: string, directId: string) {
        super();
        this.info = info;
        this.directId = directId;
    }
}

export default SearchDirectDTO;
