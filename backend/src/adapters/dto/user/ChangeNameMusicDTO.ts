import DTO from "../DTO";

class ChangeNameMusicDTO extends DTO{
    protected name: string;
    protected musicId: string;
    constructor( name: string, musicId: string) {
        super();
        this.name = name;
        this.musicId = musicId;
    }
}

export default ChangeNameMusicDTO;
