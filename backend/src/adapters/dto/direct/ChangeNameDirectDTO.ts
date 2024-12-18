import DTO from "../DTO";

class ChangeNameDirectDTO extends DTO{
    protected name: string;
    protected directId: string
    constructor(name: string, directId: string) {
        super();
        this.name = name;
        this.directId = directId;
    }
}

export default ChangeNameDirectDTO;
