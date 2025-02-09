import PodcastService from "../core/use_cases/podcast/PodcastService";
import MongoPodcastRepository from "../infrastructure/mongodb/MongoPodcastRepository";
import {getMongoClient} from "../infrastructure/mongodb/MongoClient";
import MongoUserRepository from "../infrastructure/mongodb/MongoUserRepository";
import AuthentificationService from "../core/use_cases/authentification/AuthentificationService";
import JWTManager from "../adapters/providers/authentification/JWTManager";
import JWTAuthProvider from "../adapters/providers/authentification/JWTAuthProvider";
import MongoPlaylistRepository from "../infrastructure/mongodb/MongoPlaylistRepository";
import MongoDirectRepository from "../infrastructure/mongodb/MongoDirectRepository";
import PostGresUserRepository from "../infrastructure/postgres/PostGresUserRepository";
import {db_jingle} from "../infrastructure/postgres/PostGresClient";
import PostGresPodcastRepository from "../infrastructure/postgres/PostGresPodcastRepository";
import PostGresPlaylistRepository from "../infrastructure/postgres/PostGresPlaylistRepository";

// ! Only instance of mongoClient
export const mongoClient = getMongoClient();
export const podcastRepositoryInterface = new PostGresPodcastRepository(db_jingle);
export const userRepositoryInterface = new PostGresUserRepository(db_jingle);
export const playlistRepositoryInterface = new PostGresPlaylistRepository(db_jingle);
export const directRepositoryInterface = new MongoDirectRepository(mongoClient);
export const jwtManager = new JWTManager();

export const podcastServiceInterface = new PodcastService(podcastRepositoryInterface, playlistRepositoryInterface, directRepositoryInterface);
export const authentificationServiceInterface = new AuthentificationService(userRepositoryInterface);
export const authentificationProvider = new JWTAuthProvider(jwtManager, authentificationServiceInterface);
