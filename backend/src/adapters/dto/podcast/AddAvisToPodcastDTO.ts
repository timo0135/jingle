import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";
import Avis from "../../../core/domain/entities/avis/Avis";

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
