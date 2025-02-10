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
        return this.subscribers;
    }

    public getSubscriptions(): string[] {
        return this.subscriptions;
    }

    public addSubscriber(user: string): void {
        this.subscribers.push(user);
    }

    public removeSubscriber(user: string): void {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== user);
    }

    public setSubscribers(subscribers: string[]): void {
        this.subscribers = subscribers;
    }

    public addSubscription(user: string): void {
        this.subscriptions.push(user);
    }

    public setSubscriptions(subscriptions: string[]): void {
        this.subscriptions = subscriptions;
    }

    public getPlaylists(): string[] {
        return this.playlists;
    }

    public addPlaylist(playlist: string): void {
        this.playlists.push(playlist);
    }

    public setPlaylists(playlists: string[]): void {
        this.playlists = playlists;
    }

    public getMixers(): string[] {
        return this.mixers;
    }

    public addMixer(mixer: string): void {
        this.mixers.push(mixer);
    }

    public setMixers(mixers: string[]): void {
        this.mixers = mixers;
    }

    public getDirects(): string[] {
        return this.directs;
    }

    public addDirect(direct: string): void {
        this.directs.push(direct);
    }

    public setDirects(directs: string[]): void {
        this.directs = directs;
    }

    public getGuess(): string[] {
        return this.guess;
    }

    public addGuess(guess: string): void {
        this.guess.push(guess);
    }

    public setGuess(guess: string[]): void {
        this.guess = guess;
    }
}

export default User;
