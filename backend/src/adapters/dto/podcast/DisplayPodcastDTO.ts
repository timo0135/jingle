import DTO from "../DTO";
import User from "../../../core/entities/user/User";
import Playlist from "../../../core/entities/playlist/Playlist";
import Avis from "../../../core/entities/avis/Avis";
import Podcast from "../../../core/entities/podcast/Podcast";

class DisplayPodcastDTO extends DTO{
    protected date: Date;
    protected name: string;
    protected description: string;
    protected creator: User;
    protected image: string;
    protected content: Playlist[] = [];
    protected avis: Avis[] = [];

    constructor(podcast: Podcast) {
        super();
        this.date = podcast.getDate();
        this.name = podcast.getName();
        this.description = podcast.getDescription();
        this.creator = podcast.getCreator();
        this.image = podcast.getImage();
        this.content = podcast.getContent();
        this.avis = podcast.getAvis();
    }
}

export default DisplayPodcastDTO;
