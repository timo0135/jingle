import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";
import {IsNotEmpty} from "class-validator";

class AddAvisToPodcastDTO extends DTO {

    @IsNotEmpty()
    protected podcast: Podcast;

    @IsNotEmpty()
    protected avisId: string;

    constructor(podcast: Podcast, avisId: string) {
        super();
        this.podcast = podcast;
        this.avisId = avisId;
    }
}

export default AddAvisToPodcastDTO;
