import {IsNotEmpty} from "class-validator";
import DTO from "../DTO";
import Podcast from "../../../core/domain/entities/podcast/Podcast";

class UpdateImagePodcastDTO extends DTO {
    @IsNotEmpty()
    protected image: string;
    protected podcast: Podcast

    constructor(image: string, podcast: Podcast) {
        super();
        this.image = image;
        this.podcast = podcast;
    }
}

export default UpdateImagePodcastDTO;
