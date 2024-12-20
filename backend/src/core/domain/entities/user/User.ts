import Entity from "../Entity";
import Playlist from "../playlist/Playlist";
import Music from "../music/Music";
import Direct from "../direct/Direct";

class User extends Entity {
    protected email: string;
    protected password: string;
    protected pseudo: string;
    protected role: number;
    protected subscribers: string[] = [];
    protected subscriptions: string[] = [];
    protected playlists: string[] = [];
    protected mixers: string[] = [];
    protected directs: string[] = [];
    protected guess: string[] = [];

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

    public getSubscribers(): string[] {
        if (this.role >= 2) {
            return this.subscribers;
        } else {
            return [];
        }
    }

    public getSubscriptions(): string[] {
        if (this.role >= 1) {
            return this.subscriptions;
        } else {
            return [];
        }
    }

    public addSubscriber(user: string): void {
        if (this.role >= 2) {
            this.subscribers.push(user);
        }
    }

    public setSubscribers(subscribers: string[]): void {
        if (this.role >= 2) {
            this.subscribers = subscribers;
        }
    }

    public addSubscription(user: string): void {
        if (this.role >= 1) {
            this.subscriptions.push(user);
        }
    }

    public setSubscriptions(subscriptions: string[]): void {
        if (this.role >= 1) {
            this.subscriptions = subscriptions;
        }
    }

    public getPlaylists(): string[] {
        if (this.role >= 1) {
            return this.playlists;
        }else {
            return [];
        }
    }

    public addPlaylist(playlist: string): void {
        if (this.role >= 1) {
            this.playlists.push(playlist);
        }
    }

    public setPlaylists(playlists: string[]): void {
        if (this.role >= 1) {
            this.playlists = playlists;
        }
    }

    public getMixers(): string[] {
        if (this.role >= 2) {
            return this.mixers;
        }else {
            return [];
        }
    }

    public addMixer(mixer: string): void {
        if (this.role >= 2) {
            this.mixers.push(mixer);
        }
    }

    public setMixers(mixers: string[]): void {
        if (this.role >= 2) {
            this.mixers = mixers;
        }
    }

    public getDirects(): string[] {
        if (this.role >= 2) {
            return this.directs;
        }else {
            return [];
        }
    }

    public addDirect(direct: string): void {
        if (this.role >= 2) {
            this.directs.push(direct);
        }
    }

    public setDirects(directs: string[]): void {
        if (this.role >= 2) {
            this.directs = directs;
        }
    }

    public getGuess(): string[] {
        if (this.role >= 1) {
            return this.guess;
        }else {
            return [];
        }
    }

    public addGuess(guess: string): void {
        if (this.role >= 1) {
            this.guess.push(guess);
        }
    }

    public setGuess(guess: string[]): void {
        if (this.role >= 1) {
            this.guess = guess;
        }
    }
}

export default User;
