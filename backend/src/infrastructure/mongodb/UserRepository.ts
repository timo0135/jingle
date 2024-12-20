import UserRepositoryInterface from "../../core/repositoryInterface/UserRepositoryInterface";
import User from "../../core/domain/entities/user/User";
import { MongoClient, ObjectId, MongoNetworkError, MongoServerSelectionError } from "mongodb";
import RepositoryInternalServerErrorException from "../../core/repositoryInterface/RepositoryInternalServerErrorException";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";
import Playlist from "../../core/domain/entities/playlist/Playlist";
import Music from "../../core/domain/entities/music/Music";
import Direct from "../../core/domain/entities/direct/Direct";


class UserRepository implements UserRepositoryInterface{
    protected client: Promise<MongoClient>

    constructor(client: Promise<MongoClient>) {
        this.client = client;
    }
    async init() {
        const client = await this.client;
        const database = client.db('jingle');
        return database.collection('User');
    }
    async delete(id: string): Promise<void> {
        try {
            const collection = await this.init();
            const result = await collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new RepositoryNotFoundException("User not found");
            }
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error('Error deleting user:', error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                console.error('Error deleting user:', error);
                throw new RepositoryInternalServerErrorException('Unable to delete user');
            }
        }
    }

    async find(id: string): Promise<User> {
        try{
            const collection = await this.init();
            const userDoc = await collection.findOne({ _id: new ObjectId(id) });
            if (!userDoc) {
                throw new RepositoryNotFoundException("User not found");
            }
            const user = new User(userDoc.email, userDoc.password, userDoc.pseudo, userDoc.role);
            user.setId(userDoc._id.toString());
            user.setSubscribers(userDoc.subscribers);
            user.setSubscriptions(userDoc.subscriptions);
            user.setPlaylists(userDoc.playlists);
            user.setMixers(userDoc.mixer);
            user.setDirects(userDoc.directs);
            user.setGuess(userDoc.guess);
            return user;
        }catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error finding user by ID:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                console.error("Error finding user by ID:", error);
                throw new RepositoryInternalServerErrorException('Unable to get user by ID');
            }
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const collection = await this.init();
            const usersDoc = await collection.find().toArray();
            return usersDoc.map((userDoc: any) => {
                const user = new User(userDoc.email, userDoc.password, userDoc.pseudo, userDoc.role);
                user.setId(userDoc._id.toString());
                user.setSubscribers(userDoc.subscribers);
                user.setSubscriptions(userDoc.subscriptions);
                user.setPlaylists(userDoc.playlists);
                user.setMixers(userDoc.mixer);
                user.setDirects(userDoc.directs);
                user.setGuess(userDoc.guess);
                return user;
            });
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error finding all users:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                console.error("Error finding all users:", error);
                throw new RepositoryInternalServerErrorException('Unable to get all users');
            }
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            const collection = await this.init();
            const userDoc = await collection.findOne({ email: email });
            if (!userDoc) {
                throw new RepositoryNotFoundException("User not found");
            }
            const user = new User(userDoc.email, userDoc.password, userDoc.pseudo, userDoc.role);
            user.setId(userDoc._id.toString());
            user.setSubscribers(userDoc.subscribers);
            user.setSubscriptions(userDoc.subscriptions);
            user.setPlaylists(userDoc.playlists);
            user.setMixers(userDoc.mixer);
            user.setDirects(userDoc.directs);
            user.setGuess(userDoc.guess);
            return user;
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error finding user by email:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                console.error("Error finding user by email:", error);
                throw new RepositoryInternalServerErrorException('Unable to get user by email');
            }
        }
    }

    async getByPseudo(pseudo: string): Promise<User> {
        try {
            const collection = await this.init();
            const userDoc = await collection.findOne({ pseudo: pseudo });
            if (!userDoc) {
                throw new RepositoryNotFoundException("User not found");
            }
            const user = new User(userDoc.email, userDoc.password, userDoc.pseudo, userDoc.role);
            user.setId(userDoc._id.toString());
            user.setSubscribers(userDoc.subscribers);
            user.setSubscriptions(userDoc.subscriptions);
            user.setPlaylists(userDoc.playlists);
            user.setMixers(userDoc.mixer);
            user.setDirects(userDoc.directs);
            user.setGuess(userDoc.guess);
            return user;
        }catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error finding user by pseudo:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                console.error("Error finding user by pseudo:", error);
                throw new RepositoryInternalServerErrorException('Unable to get user by pseudo');
            }
        }
    }

    async getsByRole(role: string): Promise<User[]> {
        try{
            const collection = await this.init();
            const usersDoc = await collection.find({ role: role }).toArray();
            return usersDoc.map((userDoc: any) => {
                const user = new User(userDoc.email, userDoc.password, userDoc.pseudo, userDoc.role);
                user.setId(userDoc._id.toString());
                user.setSubscribers(userDoc.subscribers);
                user.setSubscriptions(userDoc.subscriptions);
                user.setPlaylists(userDoc.playlists);
                user.setMixers(userDoc.mixer);
                user.setDirects(userDoc.directs);
                user.setGuess(userDoc.guess);
                return user;
            });
        }catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error finding user by role:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                console.error("Error finding user by role:", error);
                throw new RepositoryInternalServerErrorException('Unable to get user by role');
            }
        }
    }

    async save(user: User): Promise<string> {
        try{
            const collection = await this.init();
            if (user.getId() === null) {
                const result = await collection.insertOne({
                    email: user.getEmail(),
                    password: user.getPassword(),
                    pseudo: user.getPseudo(),
                    role: user.getRole(),
                    subscribers: [],
                    subscriptions: [],
                    playlists: [],
                    mixers: [],
                    directs: [],
                    guess: []
                });
                user.setId(result.insertedId.toString());
                return user.getId() as string;
            }else{
                const existingUser = await collection.findOne({ _id: new ObjectId(user.getId() as string) });
                if (!existingUser) {
                    throw new RepositoryNotFoundException("User not found");
                }
                const result = await collection.updateOne({ _id: new ObjectId(user.getId() as string) }, {
                    $set: {
                        email: user.getEmail(),
                        password: user.getPassword(),
                        pseudo: user.getPseudo(),
                        role: user.getRole(),
                        subscribers: user.getSubscribers(),
                        subscriptions: user.getSubscriptions(),
                        playlists: user.getPlaylists(),
                        mixers: user.getMixers(),
                        directs: user.getDirects(),
                        guess: user.getGuess()
                    }
                });
                return user.getId() as string;
            }
        }catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving user:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                console.error("Error saving user:", error);
                throw new RepositoryInternalServerErrorException('Unable to save user');
            }
        }
    }

}

export default UserRepository;
