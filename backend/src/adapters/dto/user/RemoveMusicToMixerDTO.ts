import DTO from "../DTO";
import Music from "../../../core/entities/music/Music";
import User from "../../../core/entities/user/User";
import {IsNotEmpty} from "class-validator";

class RemoveMusicToMixerDTO extends DTO {

    @IsNotEmpty()
    protected music: Music;

    @IsNotEmpty()
    protected user: User;

    constructor(music: Music, user: User) {
        super();
        this.music = music;
        this.user = user;
    }
}

export default RemoveMusicToMixerDTO;
