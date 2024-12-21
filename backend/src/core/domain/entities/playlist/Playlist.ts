import Entity from "../Entity";

class Playlist extends Entity{
    protected name: string;
    protected description: string;
    protected user: string;
    protected content: string[] = [];

    constructor(name: string, description: string, user: string) {
        super();
        this.name = name;
        this.description = description;
        this.user = user;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getUser(): string {
        return this.user;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setUser(user: string): void {
        this.user = user;
    }

    public getContent(): string[] {
        return this.content;
    }

    public addContent(podcast: string): void {
        this.content.push(podcast);
    }

    public setContent(content: string[]): void {
        this.content = content;
    }
}

export default Playlist;
