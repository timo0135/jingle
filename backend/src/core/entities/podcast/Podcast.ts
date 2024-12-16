import Entity from "../Entity";
import User from "../user/User";
import Playlist from "../playlist/Playlist";
import Avis from "../avis/Avis";

class Podcast extends Entity{
    protected date: Date;
    protected name: string;
    protected description: string;
    protected creator: User;
    protected image: string;
    protected content: Playlist[] = [];
    protected avis: Avis[] = [];

    constructor(date: Date, name: string, description: string, creator: User, image: string) {
        super();
        this.date = date;
        this.name = name;
        this.description = description;
        this.creator = creator;
        this.image = image;
    }

    public getDate(): Date {
        return this.date;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCreator(): User {
        return this.creator;
    }

    public getImage(): string {
        return this.image;
    }

    public getContent(): Playlist[] {
        return this.content;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setCreator(creator: User): void {
        this.creator = creator;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public setContent(content: Playlist[]): void {
        this.content = content;
    }

    public addContent(content: Playlist): void {
        this.content.push(content);
    }

    public removeContent(content: Playlist): void {
        this.content = this.content.filter(c => c !== content);
    }

    public getAvis(): Avis[] {
        return this.avis;
    }

    public setAvis(avis: Avis[]): void {
        this.avis = avis;
    }
}

export default Podcast;
