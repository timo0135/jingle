import Entity from "../Entity";
import User from "../user/User";
import Playlist from "../playlist/Playlist";
import Avis from "../avis/Avis";

class Podcast extends Entity{
    protected date: Date;
    protected name: string;
    protected description: string;
    protected creator: string;
    protected image: string;
    protected file: string;
    protected content: string[] = [];
    protected avis: string[] = [];

    constructor(date: Date, name: string, description: string, creator: string, image: string, file: string) {
        super();
        this.date = date;
        this.name = name;
        this.description = description;
        this.creator = creator;
        this.image = image;
        this.file = file;
    }

    public getFile(): string {
        return this.file;
    }

    public setFile(file: string): void {
        this.file = file;
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

    public getCreator(): string {
        return this.creator;
    }

    public getImage(): string {
        return this.image;
    }

    public getContent(): string[] {
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

    public setCreator(creator: string): void {
        this.creator = creator;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public setContent(content: string[]): void {
        this.content = content;
    }

    public addContent(content: string): void {
        this.content.push(content);
    }

    public removeContent(content: string): void {
        this.content = this.content.filter(c => c !== content);
    }

    public getAvis(): string[] {
        return this.avis;
    }

    public setAvis(avis: string[]): void {
        this.avis = avis;
    }
}

export default Podcast;
