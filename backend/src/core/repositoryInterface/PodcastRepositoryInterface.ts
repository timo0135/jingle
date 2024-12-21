import Podcast from "../domain/entities/podcast/Podcast";
import Avis from "../domain/entities/avis/Avis";

export interface PodcastRepositoryInterface {
    save(podcast: Podcast): Promise<string>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Podcast[]>;
    findById(id: string): Promise<Podcast | null>;
    getPodcastsByUserId(userId: string): Promise<Podcast[]>;
    getAvisByPodcastId(podcastId: string): Promise<Avis[]>;
    getAvisByUserId(userId: string): Promise<Avis[]>;
    saveAvis(avis: Avis): Promise<string>;
    deleteAvis(id: string): Promise<void>;
    findAvisById(id: string): Promise<Avis | null>;
}

