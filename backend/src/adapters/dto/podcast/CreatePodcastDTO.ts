import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import {IsNotEmpty} from "class-validator";

class CreatePodcastDTO extends DTO{

    @IsNotEmpty()
    protected date: Date;

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected description: string;

    @IsNotEmpty()
    protected creator: User;

    @IsNotEmpty()
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
