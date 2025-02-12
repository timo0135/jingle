import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class CreateMusicDTO extends DTO{

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected file: string;

    @IsNotEmpty()
    protected userId: string;

    constructor(name: string, file: string, userId: string) {
        super();
        this.name = name;
        this.file = file;
        this.userId = userId;
    }
}

export default CreateMusicDTO;
