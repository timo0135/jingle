import PlaylistRepositoryInterface from "../../core/repositoryInterface/PlaylistRepositoryInterface";
import Playlist from "../../core/domain/entities/playlist/Playlist";
import {errors} from "pg-promise";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";
import RepositoryInternalServerErrorException
    from "../../core/repositoryInterface/RepositoryInternalServerErrorException";
import { v4 as uuidv4 } from 'uuid';

class PostGresPlaylistRepository implements PlaylistRepositoryInterface {
    private db;

    constructor(db: any) {
        this.db = db;
    }

    async deletePlaylist(id: string): Promise<void> {
        try{
            await this.db.none('DELETE FROM playlist WHERE id = $1', id);
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Playlist not found');
                }
            }
            console.error('Error deleting playlist:', error);
            throw new RepositoryInternalServerErrorException('Unable to delete playlist');
        }
    }

    async find(id: string): Promise<Playlist> {
        try{
            let playlist_response = await this.db.one('SELECT * FROM playlist WHERE id = $1', id);
            let playlist_content_response = await this.db.any('SELECT podcast_id FROM content WHERE playlist_id = $1', id);
            let playlist = new Playlist(playlist_response.name, playlist_response.description, playlist_response.user_id);
            playlist.setId(playlist_response.id);
            playlist.setContent(playlist_content_response.map((content: any) => content.podcast_id));
            return playlist;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Playlist not found');
                }
            }
            console.error('Error getting playlist:', error);
            throw new RepositoryInternalServerErrorException('Unable to get playlist');
        }
    }

    async findAll(): Promise<Playlist[]> {
        try{
            let playlists_response = await this.db.any('SELECT * FROM playlist');
            return playlists_response.map((playlist :any) => {
                let playlist_content_response = this.db.any('SELECT podcast_id FROM content WHERE playlist_id = $1', playlist.id);
                let p = new Playlist(playlist.name, playlist.description, playlist.user_id);
                p.setId(playlist.id);
                p.setContent(playlist_content_response);
                return p;
            });
        }catch (error) {
            console.error('Error getting all playlists:', error);
            throw new RepositoryInternalServerErrorException('Unable to get all playlists');
        }
    }

    async getPlaylistsByPodcastId(podcastId: string): Promise<Playlist[]> {
        try{
            let playlists_response = await this.db.any('SELECT * FROM playlist WHERE id IN (SELECT playlist_id FROM content WHERE podcast_id = $1)', podcastId);
            return playlists_response.map((playlist :any) => {
                let playlist_content_response = this.db.any('SELECT podcast_id FROM content WHERE playlist_id = $1', playlist.id);
                let p = new Playlist(playlist.name, playlist.description, playlist.user_id);
                p.setId(playlist.id);
                p.setContent(playlist_content_response.map((content: any) => content.podcast_id));
                return p;
            });
        }catch (error) {
            console.error('Error getting playlists by podcast id:', error);
            throw new RepositoryInternalServerErrorException('Unable to get playlists by podcast id');
        }
    }

    async getPlaylistsByUserId(userId: string): Promise<Playlist[]> {
        try{
            let playlists_response = await this.db.any('SELECT * FROM playlist WHERE user_id = $1', userId);
            return playlists_response.map(async (playlist: any) => {
                let playlist_content_response = this.db.any('SELECT podcast_id FROM content WHERE playlist_id = $1', playlist.id);
                let p = new Playlist(playlist.name, playlist.description, playlist.user_id);
                p.setId(playlist.id);
                let content = await playlist_content_response;
                p.setContent(content.map((content: any) => content.podcast_id));
                return p;
            });
        }catch (error) {
            console.error('Error getting playlists by user id:', error);
            throw new RepositoryInternalServerErrorException('Unable to get playlists by user id');
        }
    }

    async save(playlist: Playlist): Promise<string> {
        try{
            if (playlist.getId() === null) {
                let id = uuidv4();
                await this.db.none('INSERT INTO playlist(id, name, description, user_id) VALUES($1, $2, $3, $4)', [id, playlist.getName(), playlist.getDescription(), playlist.getUser()]);
                playlist.setId(id);
            } else {
                await this.db.none('UPDATE playlist SET name = $1, description = $2, user_id = $3 WHERE id = $4', [playlist.getName(), playlist.getDescription(), playlist.getUser(), playlist.getId()]);
                await this.db.none('DELETE FROM content WHERE playlist_id = $1', [playlist.getId()]);
                let content = playlist.getContent();
                for (let i = 0; i < content.length; i++) {
                    await this.db.none('INSERT INTO content(podcast_id, playlist_id) VALUES($1, $2) ON CONFLICT DO NOTHING', [content[i], playlist.getId()]);
                }
            }
            return playlist.getId() as string;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryInternalServerErrorException('No data returned from the query');
                } else if (error.code === errors.queryResultErrorCode.notEmpty) {
                    throw new RepositoryInternalServerErrorException('Query returned unexpected data');
                }
            } else if (error instanceof Error) {
                if (error.message.includes('23505')) {
                    throw new RepositoryInternalServerErrorException('Playlist with this name already exists');
                } else if (error.message.includes('23503')) {
                    throw new RepositoryInternalServerErrorException('Foreign key violation');
                }
            }
            console.error('Error saving playlist:', error);
            throw new RepositoryInternalServerErrorException('Unable to save playlist');
        }
    }

}

export default PostGresPlaylistRepository;
