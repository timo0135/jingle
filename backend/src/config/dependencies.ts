import PodcastService from "../core/use_cases/podcast/PodcastService";
import PodcastRepository from "../infrastructure/mongodb/PodcastRepository";
import {getMongoClient} from "../infrastructure/mongodb/MongoClient";
import UserRepository from "../infrastructure/mongodb/UserRepository";
import AuthentificationService from "../core/use_cases/authentification/AuthentificationService";
import JWTManager from "../adapters/providers/authentification/JWTManager";
import JWTAuthProvider from "../adapters/providers/authentification/JWTAuthProvider";

// ! Only instance of mongoClient
export const mongoClient = getMongoClient();
export const podcastRepository = new PodcastRepository(mongoClient);
export const userRepository = new UserRepository(mongoClient);
export const jwtManager = new JWTManager();

export const podcastServiceInterface = new PodcastService(podcastRepository);
export const authentificationServiceInterface = new AuthentificationService(userRepository);
export const authentificationProvider = new JWTAuthProvider(jwtManager, authentificationServiceInterface);
