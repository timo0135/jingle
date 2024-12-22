import Entity from "../Entity";
import User from "../user/User";

class Direct extends Entity{
    protected name: string;
    protected description: string;
    protected image: string;
    protected host: string;
    protected date: Date;
    protected duration: number;
    protected guess: string[] = [];

    constructor(name: string, description: string, image: string, host: string, date: Date, duration: number) {
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

    public getHost(): string {
        return this.host;
    }

    public getDate(): Date {
        return this.date;
    }

    public getDuration(): number {
        return this.duration;
    }

    public getGuess(): string[] {
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

    public setHost(host: string): void {
        this.host = host;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public setDuration(duration: number): void {
        this.duration = duration;
    }

    public addGuess(user: string): void {
        this.guess.push(user);
    }

    public removeGuess(user: string): void {
        this.guess = this.guess.filter((u) => u !== user);
    }

    public setGuess(users: string[]): void {
        this.guess = users;
    }
}

export default Direct;
