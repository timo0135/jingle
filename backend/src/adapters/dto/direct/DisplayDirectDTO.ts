import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import Direct from "../../../core/domain/entities/direct/Direct";

class DisplayDirectDTO extends DTO{
    protected id: string | null;
    protected name: string;
    protected description: string;
    protected image: string;
    protected hostId: string;
    protected date: Date;
    protected duration: number;
    protected guess: string[] = [];

    constructor(direct: Direct) {
        super();
        this.id = direct.getId();
        this.name = direct.getName();
        this.description = direct.getDescription();
        this.image = direct.getImage();
        this.hostId = direct.getHost();
        this.date = direct.getDate();
        this.duration = direct.getDuration();
        this.guess = direct.getGuess();
    }
}

export default DisplayDirectDTO;
