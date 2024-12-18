import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class CreatePodcastDTO extends DTO{

    @IsNotEmpty()
    protected date: Date;

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected description: string;

    @IsNotEmpty()
    protected creatorId: string;

    @IsNotEmpty()
    protected image: string;

    constructor(date: Date, name: string, description: string, creatorId: string, image: string) {
        super();
        this.date = date;
        this.name = name;
        this.description = description;
        this.creatorId = creatorId;
        this.image = image;
    }
}

export default CreatePodcastDTO;
