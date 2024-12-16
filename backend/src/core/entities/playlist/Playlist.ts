import Entity from "../Entity";
import User from "../user/User";
import Podcast from "../podcast/Podcast";

class Playlist extends Entity{
    protected name: string;
    protected description: string;
    protected user: User;
    protected content: Podcast[] = [];

    constructor(name: string, description: string, user: User) {
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

    public getUser(): User {
        return this.user;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getContent(): Podcast[] {
        return this.content;
    }

    public addContent(podcast: Podcast): void {
        this.content.push(podcast);
    }
}

export default Playlist;
