import DTO from "../DTO";

class CreateAvisDTO extends DTO{
    protected title: string;
    protected content: string;
    protected podcastId: string;

    constructor(title: string, content: string, podcastId: string) {
        super();
        this.title = title;
        this.content = content;
        this.podcastId = podcastId;
    }
}

export default CreateAvisDTO;
