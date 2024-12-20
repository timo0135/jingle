import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";
import {IsNotEmpty} from "class-validator";

class AddAvisToPodcastDTO extends DTO {

    @IsNotEmpty()
    protected podcast: string;

    @IsNotEmpty()
    protected avisId: string;

    constructor(podcast: string, avisId: string) {
        super();
        this.podcast = podcast;
        this.avisId = avisId;
    }
}

export default AddAvisToPodcastDTO;
