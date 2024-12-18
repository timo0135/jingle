import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class CreateDirectDTO extends DTO{

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected description: string;

    @IsNotEmpty()
    protected image: string;

    @IsNotEmpty()
    protected hostId: string;

    @IsNotEmpty()
    protected date: Date;

    @IsNotEmpty()
    protected duration: number;

    constructor(name: string, description: string, image: string, hostId: string, date: Date, duration: number) {
        super();
        this.name = name;
        this.description = description;
        this.image = image;
        this.hostId = hostId;
        this.date = date;
        this.duration = duration;
    }
}

export default CreateDirectDTO;
