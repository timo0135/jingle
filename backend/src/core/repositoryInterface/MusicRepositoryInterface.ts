import Music from "../domain/entities/music/Music";

interface MusicRepositoryInterface {
    save(music: Music): Promise<string>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Music[]>;
    findById(id: string): Promise<Music>;
    getMusicsByUserId(userId: string): Promise<Music[]>;
}

export default MusicRepositoryInterface;
