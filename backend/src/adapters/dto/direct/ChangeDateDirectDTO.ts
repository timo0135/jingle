import DTO from "../DTO";

class ChangeDateDirectDTO extends DTO{
    protected directId: string;
    protected date: Date;
    constructor(directId: string, date: Date) {
        super();
        this.directId = directId;
        this.date = date;
    }
}

export default ChangeDateDirectDTO;
