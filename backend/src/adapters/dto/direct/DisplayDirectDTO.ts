import DTO from "../DTO";
import User from "../../../core/entities/user/User";
import Direct from "../../../core/entities/direct/Direct";

class DisplayDirectDTO extends DTO{
    protected name: string;
    protected description: string;
    protected image: string;
    protected host: User;
    protected date: Date;
    protected duration: number;
    protected guess: User[] = [];

    constructor(direct: Direct) {
        super();
        this.name = direct.getName();
        this.description = direct.getDescription();
        this.image = direct.getImage();
        this.host = direct.getHost();
        this.date = direct.getDate();
        this.duration = direct.getDuration();
        this.guess = direct.getGuess();
    }
}

export default DisplayDirectDTO;
