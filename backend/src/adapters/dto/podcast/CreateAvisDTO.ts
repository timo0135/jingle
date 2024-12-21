import DTO from "../DTO";

class CreateAvisDTO extends DTO{
    protected title: string;
    protected content: string;
    protected podcastId: string;
    protected userId: string;

    constructor(title: string, content: string, podcastId: string, userId: string) {
        super();
        this.title = title;
        this.content = content;
        this.podcastId = podcastId;
        this.userId = userId;
    }
}

export default CreateAvisDTO;
