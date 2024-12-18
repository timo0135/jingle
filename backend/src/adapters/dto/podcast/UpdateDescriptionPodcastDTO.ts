import {IsNotEmpty} from "class-validator";
import DTO from "../DTO";

class UpdateDescriptionPodcastDTO extends DTO {
    @IsNotEmpty()
    protected description: string;
    protected podcastId: string

    constructor(description: string, podcastId: string) {
        super();
        this.description = description;
        this.podcastId = podcastId;
    }
}

export default UpdateDescriptionPodcastDTO;
