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

    protected fileId: string;

    constructor(date: Date, name: string, description: string, creatorId: string, image: string, file: string) {
        super();
        this.date = date;
        this.name = name;
        this.description = description;
        this.creatorId = creatorId;
        this.image = image;
        this.fileId = file
    }
}

export default CreatePodcastDTO;
