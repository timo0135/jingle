import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import Podcast from "../../../core/domain/entities/podcast/Podcast";
import Playlist from "../../../core/domain/entities/playlist/Playlist";

class DisplayPlaylistDTO extends DTO{
    protected name: string;
    protected description: string;
    protected user: User;
    protected content: Podcast[] = [];

    constructor(playlist : Playlist) {
        super();
        this.name = playlist.getName();
        this.description = playlist.getDescription();
        this.user = playlist.getUser();
        this.content = playlist.getContent();
    }
}

export default DisplayPlaylistDTO;
