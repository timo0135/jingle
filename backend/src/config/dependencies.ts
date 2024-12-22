import PodcastService from "../core/use_cases/podcast/PodcastService";
import PodcastRepository from "../infrastructure/mongodb/PodcastRepository";
import {getMongoClient} from "../infrastructure/mongodb/MongoClient";
import UserRepository from "../infrastructure/mongodb/UserRepository";
import AuthentificationService from "../core/use_cases/authentification/AuthentificationService";
import JWTManager from "../adapters/providers/authentification/JWTManager";
import JWTAuthProvider from "../adapters/providers/authentification/JWTAuthProvider";
import PlaylistRepository from "../infrastructure/mongodb/PlaylistRepository";
import DirectRepository from "../infrastructure/mongodb/DirectRepository";

// ! Only instance of mongoClient
export const mongoClient = getMongoClient();
export const podcastRepositoryInterface = new PodcastRepository(mongoClient);
export const userRepositoryInterface = new UserRepository(mongoClient);
export const playlistRepositoryInterface = new PlaylistRepository(mongoClient);
export const directRepositoryInterface = new DirectRepository(mongoClient);
export const jwtManager = new JWTManager();

export const podcastServiceInterface = new PodcastService(podcastRepositoryInterface, playlistRepositoryInterface, directRepositoryInterface);
export const authentificationServiceInterface = new AuthentificationService(userRepositoryInterface);
export const authentificationProvider = new JWTAuthProvider(jwtManager, authentificationServiceInterface);
