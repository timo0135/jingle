import DTO from "../DTO";
import Music from "../../../core/domain/entities/music/Music";

class SearchMusicDTO extends DTO{
    protected info: string;
    protected music: Music;

    constructor(info: string, music: Music) {
        super();
        this.info = info;
        this.music = music;
    }
}

export default SearchMusicDTO;
