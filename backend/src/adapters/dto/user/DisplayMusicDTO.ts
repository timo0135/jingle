import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import Music from "../../../core/domain/entities/music/Music";

class DisplayMusicDTO extends DTO{
    protected id: string | null;
    protected name: string;
    protected file: string;
    protected users: string[]

    constructor(music: Music) {
        super();
        this.id = music.getId();
        this.name = music.getName();
        this.file = music.getFile();
        this.users = music.getUsers();
    }
}

export default DisplayMusicDTO;
