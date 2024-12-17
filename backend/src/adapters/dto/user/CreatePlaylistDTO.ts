import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import {IsNotEmpty} from "class-validator";

class CreatePlaylistDTO extends DTO{

    @IsNotEmpty()
    protected name: string;

    @IsNotEmpty()
    protected user: User;
    constructor(name: string, user: User) {
        super();
        this.name = name;
        this.user = user;
    }
}

export default CreatePlaylistDTO;
