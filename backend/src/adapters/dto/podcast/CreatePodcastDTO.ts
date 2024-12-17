import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";

class CreatePodcastDTO extends DTO{
    protected date: Date;
    protected name: string;
    protected description: string;
    protected creator: User;
    protected image: string;

    constructor(date: Date, name: string, description: string, creator: User, image: string) {
        super();
        this.date = date;
        this.name = name;
        this.description = description;
        this.creator = creator;
        this.image = image;
    }
}

export default CreatePodcastDTO;
