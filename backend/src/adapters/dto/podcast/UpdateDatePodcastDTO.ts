import DTO from "../DTO";

class UpdateDatePodcastDTO extends DTO{
    protected date: Date;
    protected podcastId: string;

    constructor(date: Date, podcastId: string) {
        super();
        this.date = date;
        this.podcastId = podcastId;
    }
}

export default UpdateDatePodcastDTO;
