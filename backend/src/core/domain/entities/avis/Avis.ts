import Entity from "../Entity";
import Podcast from "../podcast/Podcast";

class Avis extends Entity{
    protected title: string;
    protected content: string;
    protected podcast: Podcast;

    constructor(title: string, content: string, podcast: Podcast) {
        super();
        this.title = title;
        this.content = content;
        this.podcast = podcast;
    }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public getPodcast(): Podcast {
        return this.podcast;
    }

    public setPodcast(podcast: Podcast): void {
        this.podcast = podcast;
    }
}

export default Avis;
