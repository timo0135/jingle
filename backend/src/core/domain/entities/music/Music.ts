import Entity from "../Entity";
import User from "../user/User";

class Music extends Entity{
    protected name: string;
    protected file: string;
    protected userId: string;

    constructor(name: string, file: string, userId: string) {
        super();
        this.name = name;
        this.file = file;
        this.userId = userId;
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

    public getUserID(): string {
        return this.userId;
    }

    public setUserID(userId: string): void {
        this.userId = userId
    }
}

export default Music;
