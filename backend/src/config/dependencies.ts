import PodcastService from "../core/use_cases/podcast/PodcastService";
import PodcastRepository from "../infrastructure/mongodb/PodcastRepository";
import {getMongoClient} from "../infrastructure/mongodb/MongoClient";
import UserRepository from "../infrastructure/mongodb/UserRepository";

// ! Only instance of mongoClient
export const mongoClient = getMongoClient();
export const podcastRepository = new PodcastRepository(mongoClient);
export const userRepository = new UserRepository(mongoClient);

export const podcastServiceInterface = new PodcastService(podcastRepository, userRepository);
