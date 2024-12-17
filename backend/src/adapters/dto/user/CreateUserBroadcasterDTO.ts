import DTO from "../DTO";
import User from "../../../core/entities/user/User";
import Playlist from "../../../core/entities/playlist/Playlist";
import Music from "../../../core/entities/music/Music";
import Direct from "../../../core/entities/direct/Direct";
import {IsNotEmpty} from "class-validator";

class CreateUserBroadcasterDTO extends DTO{

    @IsNotEmpty()
    protected email: string;

    @IsNotEmpty()
    protected password: string;

    @IsNotEmpty()
    protected pseudo: string;
    protected role: number = 2;
    protected subscribers: User[] = [];
    protected subscriptions: User[] = [];
    protected playlists: Playlist[] = [];
    protected mixers: Music[] = [];
    protected directs: Direct[] = [];
    protected guess: Direct[] = [];

    constructor(email: string, password: string, pseudo: string) {
        super();
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
    }
}
