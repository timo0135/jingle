import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";
import Playlist from "../../../core/domain/entities/playlist/Playlist";
import Avis from "../../../core/domain/entities/avis/Avis";
import Podcast from "../../../core/domain/entities/podcast/Podcast";

class DisplayPodcastDTO extends DTO{
    protected id: string | null;
    protected date: Date;
    protected name: string;
    protected description: string;
    protected file: string;

    constructor(podcast: Podcast) {
        super();
        this.id = podcast.getId();
        this.date = podcast.getDate();
        this.name = podcast.getName();
        this.description = podcast.getDescription();
        this.file = podcast.getFile();
    }
}

export default DisplayPodcastDTO;
