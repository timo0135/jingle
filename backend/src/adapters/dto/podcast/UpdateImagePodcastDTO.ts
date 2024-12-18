import {IsNotEmpty} from "class-validator";
import DTO from "../DTO";

class UpdateImagePodcastDTO extends DTO {
    @IsNotEmpty()
    protected image: string;
    protected podcastId: string

    constructor(image: string, podcastId: string) {
        super();
        this.image = image;
        this.podcastId = podcastId;
    }
}

export default UpdateImagePodcastDTO;
