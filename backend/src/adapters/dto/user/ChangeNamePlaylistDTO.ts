import DTO from "../DTO";

class ChangeNamePlaylistDTO extends DTO{
    protected name: string;
    protected playlistId: string;

    constructor(name: string, playlistId: string) {
        super();
        this.name = name;
        this.playlistId = playlistId;
    }
}

export default ChangeNamePlaylistDTO;
