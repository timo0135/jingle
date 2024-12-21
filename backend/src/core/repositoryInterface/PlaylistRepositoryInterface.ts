import Playlist from "../domain/entities/playlist/Playlist";

interface PlaylistRepositoryInterface {
    save(playlist: Playlist): Promise<string>;
    find(id: string): Promise<Playlist>;
    findAll(): Promise<Playlist[]>;
    getPlaylistsByUserId(userId: string): Promise<Playlist[]>;
    getPlaylistsByPodcastId(podcastId: string): Promise<Playlist[]>;
    deletePlaylist(id: string): Promise<void>;
}

export default PlaylistRepositoryInterface
