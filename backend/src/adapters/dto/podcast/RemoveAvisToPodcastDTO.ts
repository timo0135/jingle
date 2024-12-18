import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class RemoveAvisToPodcastDTO extends DTO{

    @IsNotEmpty()
    protected podcastId: string;

    @IsNotEmpty()
    protected avisId: string;

    constructor(podcastId: string, avisId: string) {
        super();
        this.podcastId = podcastId;
        this.avisId = avisId;
    }
}

export default RemoveAvisToPodcastDTO;
