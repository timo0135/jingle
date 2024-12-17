import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import {IsNotEmpty} from "class-validator";

class CreateDirectDTO extends DTO{

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected description: string;

    @IsNotEmpty()
    protected image: string;

    @IsNotEmpty()
    protected host: User;

    @IsNotEmpty()
    protected date: Date;

    @IsNotEmpty()
    protected duration: number;

    constructor(name: string, description: string, image: string, host: User, date: Date, duration: number) {
        super();
        this.name = name;
        this.description = description;
        this.image = image;
        this.host = host;
        this.date = date;
        this.duration = duration;
    }
}

export default CreateDirectDTO;
