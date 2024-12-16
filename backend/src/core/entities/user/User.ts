import Entity from "../Entity";
import Playlist from "../playlist/Playlist";
import Music from "../music/Music";
import Direct from "../direct/Direct";

class User extends Entity {
    protected email: string;
    protected password: string;
    protected pseudo: string;
    protected role: number;
    protected subscribers: User[] = [];
    protected subscriptions: User[] = [];
    protected playlists: Playlist[] = [];
    protected mixers: Music[] = [];
    protected directs: Direct[] = [];
    protected guess: Direct[] = [];

    constructor(email: string, password: string, pseudo: string, role: number) {
        super();
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
        this.role = role;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getPseudo(): string {
        return this.pseudo;
    }

    public getRole(): number {
        return this.role;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setPseudo(pseudo: string): void {
        this.pseudo = pseudo;
    }

    public setRole(role: number): void {
        this.role = role;
    }

    public getSubscribers(): User[] {
        if (this.role >= 2) {
            return this.subscribers;
        } else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public getSubscriptions(): User[] {
        if (this.role >= 1) {
            return this.subscriptions;
        } else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public addSubscriber(user: User): void {
        if (this.role >= 2) {
            this.subscribers.push(user);
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public addSubscription(user: User): void {
        if (this.role >= 1) {
            this.subscriptions.push(user);
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public getPlaylists(): Playlist[] {
        if (this.role >= 1) {
            return this.playlists;
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public addPlaylist(playlist: Playlist): void {
        if (this.role >= 1) {
            this.playlists.push(playlist);
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public getMixers(): Music[] {
        if (this.role >= 2) {
            return this.mixers;
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public addMixer(mixer: Music): void {
        if (this.role >= 2) {
            this.mixers.push(mixer);
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public getDirects(): Direct[] {
        if (this.role >= 2) {
            return this.directs;
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public addDirect(direct: Direct): void {
        if (this.role >= 2) {
            this.directs.push(direct);
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public getGuess(): Direct[] {
        if (this.role >= 1) {
            return this.guess;
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }

    public addGuess(guess: Direct): void {
        if (this.role >= 1) {
            this.guess.push(guess);
        }else {
            throw new Error("Access denied: insufficient role");
        }
    }
}

export default User;
