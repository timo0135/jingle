import Entity from "../Entity";
import User from "../user/User";

class Music extends Entity{
    protected name: string;
    protected file: string;
    protected mixers: User[] = [];

    constructor(name: string, file: string) {
        super();
        this.name = name;
        this.file = file;
    }

    public getName(): string {
        return this.name;
    }

    public getFile(): string {
        return this.file;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setFile(file: string): void {
        this.file = file;
    }

    public getMixer(): User[] {
        return this.mixers;
    }

    public addMixer(user: User): void {
        this.mixers.push(user);
    }
}

export default Music;
