import Entity from "../Entity";
import User from "../user/User";

class Music extends Entity{
    protected name: string;
    protected file: string;
    protected users: string[] = [];

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

    public getUsers(): string[] {
        return this.users;
    }

    public setUser(userId: string[]): void {
        this.users = userId
    }

    public addUser(userId: string): void {
        this.users.push(userId);
    }

    public removeUser(userId: string): void {
        this.users = this.users.filter((user) => user !== userId);
    }
}

export default Music;
