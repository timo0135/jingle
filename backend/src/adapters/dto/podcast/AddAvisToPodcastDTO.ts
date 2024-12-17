import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";
import Avis from "../../../core/domain/entities/avis/Avis";
import {IsNotEmpty} from "class-validator";

class AddAvisToPodcastDTO extends DTO {

    @IsNotEmpty()
    protected podcast: Podcast;

    @IsNotEmpty()
    protected avis: Avis;

    constructor(podcast: Podcast, avis: Avis) {
        super();
        this.podcast = podcast;
        this.avis = avis;
    }
}

export default AddAvisToPodcastDTO;
