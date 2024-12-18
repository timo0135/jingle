import DTO from "../DTO";

class SearchPodcastDTO extends DTO{
    protected info: string;
    protected podcastId: string;

    constructor(info: string, podcastId: string) {
        super();
        this.info = info;
        this.podcastId = podcastId;
    }
}

export default SearchPodcastDTO;
