import DTO from "../DTO";
import Playlist from "../../../core/domain/entities/playlist/Playlist";

class ChangeNamePlaylistDTO extends DTO{
    protected name: string;
    protected playlist: Playlist;

    constructor(name: string, playlist: Playlist) {
        super();
        this.name = name;
        this.playlist = playlist;
    }
}

export default ChangeNamePlaylistDTO;
