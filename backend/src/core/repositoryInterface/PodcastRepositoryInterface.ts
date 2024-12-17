import Podcast from "../domain/entities/podcast/Podcast";

export interface PodcastRepositoryInterface {
    findById(id: string): Promise<Podcast | null>;
    findAll(): Promise<Podcast[]>;
}

