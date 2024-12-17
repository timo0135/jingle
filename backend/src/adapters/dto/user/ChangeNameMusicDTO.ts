import DTO from "../DTO";
import Music from "../../../core/domain/entities/music/Music";

class ChangeNameMusicDTO extends DTO{
    protected name: string;
    protected music: Music;
    constructor( name: string, music: Music) {
        super();
        this.name = name;
        this.music = music;
    }
}

export default ChangeNameMusicDTO;
