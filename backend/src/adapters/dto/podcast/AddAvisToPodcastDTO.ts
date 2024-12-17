import DTO from "../DTO";
import Podcast from "../../../core/entities/podcast/Podcast";
import Avis from "../../../core/entities/avis/Avis";

class AddAvisToPodcastDTO extends DTO {
    protected podcast: Podcast;
    protected avis: Avis;

    constructor(podcast: Podcast, avis: Avis) {
        super();
        this.podcast = podcast;
        this.avis = avis;
    }
}

export default AddAvisToPodcastDTO;
