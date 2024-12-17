import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import Music from "../../../core/domain/entities/music/Music";

class DisplayMusicDTO extends DTO{
    protected name: string;
    protected file: string;
    protected mixers: User[] = [];

    constructor(music: Music) {
        super();
        this.name = music.getName();
        this.file = music.getFile();
        this.mixers = music.getMixer();
    }
}

export default DisplayMusicDTO;
