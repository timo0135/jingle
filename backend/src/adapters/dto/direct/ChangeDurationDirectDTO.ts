import DTO from "../DTO";

class ChangeDurationDirectDTO extends DTO{
    protected duration: number;
    protected directId: string;

    constructor(duration: number, directId: string) {
        super();
        this.duration = duration;
        this.directId = directId;
    }
}

export default ChangeDurationDirectDTO;
