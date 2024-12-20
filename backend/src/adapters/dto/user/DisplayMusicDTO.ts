import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import Music from "../../../core/domain/entities/music/Music";

class DisplayMusicDTO extends DTO{
    protected id: string | null;
    protected name: string;
    protected file: string;
    protected userId: string

    constructor(music: Music) {
        super();
        this.id = music.getId();
        this.name = music.getName();
        this.file = music.getFile();
        this.userId = music.getUserID();
    }
}

export default DisplayMusicDTO;
