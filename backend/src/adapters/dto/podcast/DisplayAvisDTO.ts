import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";
import Avis from "../../../core/domain/entities/avis/Avis";

class DisplayAvisDTO extends DTO{
    protected id: string | null;
    protected title: string;
    protected content: string;
    protected podcast: string;

    constructor(avis: Avis) {
        super();
        this.id = avis.getId();
        this.title = avis.getTitle();
        this.content = avis.getContent();
        this.podcast = avis.getPodcast();
    }
}

export default DisplayAvisDTO;
