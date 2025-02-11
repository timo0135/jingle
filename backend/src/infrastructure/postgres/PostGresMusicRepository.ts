import MusicRepositoryInterface from "../../core/repositoryInterface/MusicRepositoryInterface";
import Music from "../../core/domain/entities/music/Music";
import {errors} from "pg-promise";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";
import RepositoryInternalServerErrorException
    from "../../core/repositoryInterface/RepositoryInternalServerErrorException";
import {v4 as uuidv4} from 'uuid';

class PostGresMusicRepository implements MusicRepositoryInterface {
    private db;

    constructor(db: any) {
        this.db = db;
    }

    async delete(id: string): Promise<void> {
        try {
            await this.db.none('DELETE FROM music WHERE id = $1', id);
        } catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Direct not found');
                }
            }
            console.error('Error deleting direct:', error);
            throw new RepositoryInternalServerErrorException('Unable to delete direct');
        }
    }

    async findAll(): Promise<Music[]> {
        try{
            let musics_reponse = await this.db.any('SELECT * FROM music');
            return musics_reponse.map(async (music: any) => {
                let mixers_reponse = await this.db.any('SELECT user_id FROM mixer WHERE music_id = $1', music.id);
                let m: Music = new Music(music.name, music.file);
                m.setId(music.id);
                let mixers: string[] = await mixers_reponse
                m.setUser(mixers.map((mixer: any) => mixer.user_id));
            });
        }catch (error){
            console.error('Error getting musics:', error);
            throw new RepositoryInternalServerErrorException('Unable to get musics');
        }
    }

    async findById(id: string): Promise<Music> {
        try{
            let music_reponse = await this.db.one('SELECT * FROM music WHERE id = $1', id);
            let mixers_reponse = await this.db.any('SELECT user_id FROM mixer WHERE music_id = $1', id);
            let m : Music = new Music(music_reponse.name, music_reponse.file);
            m.setId(music_reponse.id);
            let mixers : string[] = await mixers_reponse
            m.setUser(mixers.map((mixer: any) => mixer.user_id));
            return m;
        }catch (error){
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Direct not found');
                }
            }
            console.error('Error getting music:', error);
            throw new RepositoryInternalServerErrorException('Unable to get music');
        }
    }

    async getMusicsByUserId(userId: string): Promise<Music[]> {
        try {
            let musics_reponse = await this.db.any(`
            SELECT m.id, m.name, m.file
            FROM music m
            JOIN mixer mx ON m.id = mx.music_id
            WHERE mx.user_id = $1
        `, userId);

            return musics_reponse.map(async (music: any) => {
                let mixers_reponse = await this.db.any('SELECT user_id FROM mixer WHERE music_id = $1', music.id);
                let m: Music = new Music(music.name, music.file);
                m.setId(music.id);
                let mixers: string[] = mixers_reponse.map((mixer: any) => mixer.user_id);
                m.setUser(mixers);
                return m;
            });
        } catch (error) {
            console.error('Error getting musics:', error);
            throw new RepositoryInternalServerErrorException('Unable to get musics');
        }
    }

    async save(music: Music): Promise<string> {
        try{
            if (music.getId() === null){
                let id: string = uuidv4();
                await this.db.none('INSERT INTO music(id, name, file) VALUES($1, $2, $3)', [id, music.getName(), music.getFile()]);
                music.setId(id);

                await this.db.none('DELETE FROM mixer WHERE music_id = $1', [music.getId()]);
                let users = music.getUsers();
                for (let i = 0; i < users.length; i++) {
                    await this.db.none('INSERT INTO mixer(user_id, music_id) VALUES($1, $2) ON CONFLICT DO NOTHING', [users[i], music.getId()]);
                }
            }else{
                await this.db.none('UPDATE music SET name = $1, file = $2 WHERE id = $3', [music.getName(), music.getFile(), music.getId()]);
                await this.db.none('DELETE FROM mixer WHERE music_id = $1', [music.getId()]);
                let users = music.getUsers();
                for (let i = 0; i < users.length; i++) {
                    await this.db.none('INSERT INTO mixer(user_id, music_id) VALUES($1, $2) ON CONFLICT DO NOTHING', [users[i], music.getId()]);
                }
            }
            return music.getId() as string;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryInternalServerErrorException('No data returned from the query');
                } else if (error.code === errors.queryResultErrorCode.notEmpty) {
                    throw new RepositoryInternalServerErrorException('Query returned unexpected data');
                }
            } else if (error instanceof Error) {
                if (error.message.includes('23505')) {
                    throw new RepositoryInternalServerErrorException('User with this email already exists');
                } else if (error.message.includes('23503')) {
                    throw new RepositoryInternalServerErrorException('Foreign key violation');
                }
            }
            console.error('Error saving user:', error);
            throw new RepositoryInternalServerErrorException('Unable to save user');
        }
    }
}

export default PostGresMusicRepository;
