import Entity from "../Entity";
import User from "../user/User";

class Direct extends Entity{
    protected name: string;
    protected description: string;
    protected image: string;
    protected host: User;
    protected date: Date;
    protected duration: number;
    protected guess: User[] = [];

    constructor(name: string, description: string, image: string, host: User, date: Date, duration: number) {
        super();
        this.name = name;
        this.description = description;
        this.image = image;
        this.host = host;
        this.date = date;
        this.duration = duration;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getImage(): string {
        return this.image;
    }

    public getHost(): User {
        return this.host;
    }

    public getDate(): Date {
        return this.date;
    }

    public getDuration(): number {
        return this.duration;
    }

    public getGuess(): User[] {
        return this.guess;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public setHost(host: User): void {
        this.host = host;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public setDuration(duration: number): void {
        this.duration = duration;
    }

    public addGuess(user: User): void {
        this.guess.push(user);
    }
}

export default Direct;
