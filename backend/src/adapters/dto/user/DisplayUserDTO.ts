import DTO from "../DTO";
import Playlist from "../../../core/domain/entities/playlist/Playlist";
import Music from "../../../core/domain/entities/music/Music";
import Direct from "../../../core/domain/entities/direct/Direct";
import User from "../../../core/domain/entities/user/User";

class DisplayUserDTO extends DTO {
    protected id: string | null;
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
    protected token: string | null = null;
    protected refresh: string | null = null;

    constructor(user: User, token?: string, refresh?: string) {
        super();
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.pseudo = user.getPseudo();
        this.role = user.getRole();
        this.subscribers = user.getSubscribers();
        this.subscriptions = user.getSubscriptions();
        this.playlists = user.getPlaylists();
        this.mixers = user.getMixers();
        this.directs = user.getDirects();
        this.guess = user.getGuess();
        if (token) {
            this.token = token;
        }
        if (refresh) {
            this.refresh = refresh;
        }
    }
}

export default DisplayUserDTO;
