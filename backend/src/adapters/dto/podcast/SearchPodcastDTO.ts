import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";

class SearchPodcastDTO extends DTO{
    protected info: string;
    protected podcast: Podcast;

    constructor(info: string, podcast: Podcast) {
        super();
        this.info = info;
        this.podcast = podcast;
    }
}

export default SearchPodcastDTO;
