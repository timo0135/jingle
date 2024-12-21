import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class CreatePlaylistDTO extends DTO{

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected description: string;

    @IsNotEmpty()
    protected userId: string;
    constructor(name: string, description: string, userId: string) {
        super();
        this.name = name;
        this.userId = userId;
        this.description = description;
    }
}

export default CreatePlaylistDTO;
