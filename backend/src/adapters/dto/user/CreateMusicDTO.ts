import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class CreateMusicDTO extends DTO{

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected file: string;

    constructor(name: string, file: string) {
        super();
        this.name = name;
        this.file = file;
    }
}

export default CreateMusicDTO;
