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
import PostGresDirectRepository from "../infrastructure/postgres/PostGresDirectRepository";
import FileServiceHTTP from "../infrastructure/http/FileServiceHTTP";
import PostGresMusicRepository from "../infrastructure/postgres/PostGresMusicRepository";
import AuthorizationPodcastService from "../core/use_cases/podcast/authorization/AuthorizationPodcastService";
import AuthorizationAuthentificationService
    from "../core/use_cases/authentification/authorization/AuthorizationAuthentificationService";

// ! Only instance of mongoClient
export const mongoClient = getMongoClient();
export const podcastRepositoryInterface = new PostGresPodcastRepository(db_jingle);
export const userRepositoryInterface = new PostGresUserRepository(db_jingle);
export const playlistRepositoryInterface = new PostGresPlaylistRepository(db_jingle);
export const directRepositoryInterface = new PostGresDirectRepository(db_jingle);
export const musicRepositoryInterface = new PostGresMusicRepository(db_jingle);
export const jwtManager = new JWTManager();
export const authorizationPodcastServiceInterface = new AuthorizationPodcastService(podcastRepositoryInterface, playlistRepositoryInterface, directRepositoryInterface, userRepositoryInterface, musicRepositoryInterface);
export const authorizationAuthentificationServiceInterface = new AuthorizationAuthentificationService(userRepositoryInterface);

export const podcastServiceInterface = new PodcastService(podcastRepositoryInterface, playlistRepositoryInterface, directRepositoryInterface, userRepositoryInterface, musicRepositoryInterface);
export const authentificationServiceInterface = new AuthentificationService(userRepositoryInterface);
export const authentificationProvider = new JWTAuthProvider(jwtManager, authentificationServiceInterface);
export const fileServiceInterface = new FileServiceHTTP();
