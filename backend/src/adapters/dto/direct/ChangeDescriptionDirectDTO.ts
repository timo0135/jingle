import DTO from "../DTO";

class ChangeDescriptionDirectDTO extends DTO{
    protected description: string;
    protected directId: string;

    constructor(description: string, directId: string) {
        super();
        this.description = description;
        this.directId = directId;
    }
}

export default ChangeDescriptionDirectDTO;
