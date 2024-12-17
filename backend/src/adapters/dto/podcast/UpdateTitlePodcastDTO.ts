import {IsNotEmpty} from "class-validator";
import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";

class UpdateTitlePodcastDTO extends DTO {
    @IsNotEmpty()
    protected title: string;
    protected podcast: Podcast

    constructor(title: string, podcast: Podcast) {
        super();
        this.title = title;
        this.podcast = podcast;
    }
}

export default UpdateTitlePodcastDTO;
