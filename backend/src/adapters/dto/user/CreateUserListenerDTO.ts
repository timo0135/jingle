import Playlist from "../../../core/domain/entities/playlist/Playlist";
import Music from "../../../core/domain/entities/music/Music";
import Direct from "../../../core/domain/entities/direct/Direct";
import User from "../../../core/domain/entities/user/User";
import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class CreateUserListenerDTO extends DTO{

    @IsNotEmpty()
    protected email: string;

    @IsNotEmpty()
    protected password: string;

    @IsNotEmpty()
    protected pseudo: string;
    protected role: number = 1;
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

export default CreateUserListenerDTO;
