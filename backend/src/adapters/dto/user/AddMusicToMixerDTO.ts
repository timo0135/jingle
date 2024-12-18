import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class AddMusicToMixerDTO extends DTO{

    @IsNotEmpty()
    protected musicId: string;

    @IsNotEmpty()
    protected userId: string;

    constructor(musicId: string, userId: string) {
        super();
        this.musicId = musicId;
        this.userId = userId;
    }
}

export default AddMusicToMixerDTO;
