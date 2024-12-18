import PodcastService from "../core/use_cases/podcast/PodcastService";
import PodcastRepository from "../infrastructure/mongodb/PodcastRepository";
import {getMongoClient} from "../infrastructure/mongodb/MongoClient";

// ! Only instance of mongoClient
const mongoClient = getMongoClient();

export const podcastServiceInterface = new PodcastService(new PodcastRepository(mongoClient));
