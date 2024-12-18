import {IsNotEmpty} from "class-validator";
import DTO from "../DTO";

class UpdateTitlePodcastDTO extends DTO {
    @IsNotEmpty()
    protected title: string;
    protected podcastId: string

    constructor(title: string, podcastId: string) {
        super();
        this.title = title;
        this.podcastId = podcastId;
    }
}

export default UpdateTitlePodcastDTO;
