import {IsNotEmpty} from "class-validator";
import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";

class UpdateDescriptionPodcastDTO extends DTO {
    @IsNotEmpty()
    protected description: string;
    protected podcast: Podcast

    constructor(description: string, podcast: Podcast) {
        super();
        this.description = description;
        this.podcast = podcast;
    }
}

export default UpdateDescriptionPodcastDTO;
