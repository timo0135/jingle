import DTO from "../DTO";

class SearchMusicDTO extends DTO{
    protected info: string;
    protected musicId: string;

    constructor(info: string, musicId: string) {
        super();
        this.info = info;
        this.musicId = musicId;
    }
}

export default SearchMusicDTO;
