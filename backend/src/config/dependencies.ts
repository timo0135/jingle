import PodcastService from "../core/use_cases/podcast/PodcastService";
import PodcastRepository from "../infrastructure/mongodb/PodcastRepository";

export const podcastServiceInterface = new PodcastService(new PodcastRepository());
