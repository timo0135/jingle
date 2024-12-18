import Podcast from "../domain/entities/podcast/Podcast";

export interface PodcastRepositoryInterface {
    save(podcast: Podcast): Promise<string>;
    findAll(): Promise<Podcast[]>;
    findById(id: string): Promise<Podcast | null>;
    getPodcastsByUserId(userId: string): Promise<Podcast[]>;
}

