import PlaylistRepositoryInterface from "../../core/repositoryInterface/PlaylistRepositoryInterface";
import Playlist from "../../core/domain/entities/playlist/Playlist";
import {MongoClient, MongoNetworkError, MongoServerSelectionError, ObjectId} from "mongodb";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";
import console from "node:console";
import RepositoryInternalServerErrorException from "../../core/repositoryInterface/RepositoryInternalServerErrorException";

class PlaylistRepository implements PlaylistRepositoryInterface {
    private readonly client: Promise<MongoClient>;

    constructor(client: Promise<MongoClient>) {
        this.client = client;
    }

    async initCollectionPlaylist() {
        const client = await this.client;
        const database = client.db('jingle');
        return database.collection('Playlist');
    }

    async deletePlaylist(id: string): Promise<void> {
        try {
            const collection = await this.initCollectionPlaylist();
            const result = await collection.deleteOne({_id: new ObjectId(id)});
            if (result.deletedCount === 0) {
                throw new RepositoryNotFoundException("Playlist not found");
            }
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving podcast:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while deleting playlist");
            }
        }
    }

    async find(id: string): Promise<Playlist> {
        try{
            const collection = await this.initCollectionPlaylist();
            const result = await collection.findOne({_id: new ObjectId(id)});
            if (result === null) {
                throw new RepositoryNotFoundException("Playlist not found");
            }
            const playlist = new Playlist(result.name, result.description, result.userId);
            playlist.setContent(result.content);
            playlist.setId(result._id.toString());
            return playlist;
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving podcast:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while finding playlist");
            }
        }
    }

    async findAll(): Promise<Playlist[]> {
        try{
            const collection = await this.initCollectionPlaylist();
            const result = await collection.find().toArray();
            return result.map((playlist: any) => {
                const p = new Playlist(playlist.name, playlist.description, playlist.userId);
                p.setContent(playlist.content);
                p.setId(playlist._id.toString());
                return p;
            });
        } catch (error){
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving podcast:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while fetching playlists");
            }
        }
    }

    async getPlaylistsByPodcastId(podcastId: string): Promise<Playlist[]> {
        try{
            return this.initCollectionPlaylist().then((collection) => {
                return collection.find({content: podcastId}).toArray();
            }).then((result) => {
                return result.map((playlist: any) => {
                    const p = new Playlist(playlist.name, playlist.description, playlist.userId);
                    p.setContent(playlist.content);
                    p.setId(playlist._id.toString());
                    return p;
                });
            });
        } catch (error){
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving podcast:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while fetching playlists");
            }
        }
    }

    async getPlaylistsByUserId(userId: string): Promise<Playlist[]> {
        try{
            return this.initCollectionPlaylist().then((collection) => {
                return collection.find({userId: userId}).toArray();
            }).then((result) => {
                return result.map((playlist: any) => {
                    const p = new Playlist(playlist.name, playlist.description, playlist.userId);
                    p.setContent(playlist.content);
                    p.setId(playlist._id.toString());
                    return p;
                });
            });
        } catch (error){
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving podcast:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while fetching playlists");
            }
        }
    }

    async save(playlist: Playlist): Promise<string> {
        try{
            const collection = await this.initCollectionPlaylist();
            if(playlist.getId() === null){
                const result = await collection.insertOne({
                    name: playlist.getName(),
                    description: playlist.getDescription(),
                    userId: playlist.getUser(),
                    content: playlist.getContent()
                });
                playlist.setId(result.insertedId.toString());
            }else{
                const existingPlaylist = await this.find(playlist.getId() as string);
                if(existingPlaylist === null){
                    throw new RepositoryNotFoundException("Playlist not found");
                }
                await collection.updateOne({_id: new ObjectId(playlist.getId() as string)}, {
                    $set: {
                        name: playlist.getName(),
                        description: playlist.getDescription(),
                        userId: playlist.getUser(),
                        content: playlist.getContent()
                    }
                });
            }
            return playlist.getId() as string;
        } catch (error){
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving podcast:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while fetching playlists");
            }
        }
    }

}

export default PlaylistRepository;
