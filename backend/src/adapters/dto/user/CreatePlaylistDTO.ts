import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class CreatePlaylistDTO extends DTO{

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected userId: string;
    constructor(name: string, userId: string) {
        super();
        this.name = name;
        this.userId = userId;
    }
}

export default CreatePlaylistDTO;
