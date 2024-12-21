import Entity from "../Entity";

class Avis extends Entity{
    protected title: string;
    protected content: string;
    protected podcast: string;
    protected userId: string;

    constructor(title: string, content: string, podcast: string, userId: string) {
        super();
        this.title = title;
        this.content = content;
        this.podcast = podcast;
        this.userId = userId;
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

    public getPodcast(): string {
        return this.podcast;
    }

    public setPodcast(podcast: string): void {
        this.podcast = podcast;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }
}

export default Avis;
