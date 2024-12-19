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
            if(userDoc.subscribers !== null) {
                userDoc.subscribers.forEach((subscriber: any) => {
                    const u = new User(subscriber.email, subscriber.password, subscriber.pseudo, subscriber.role);
                    u.setId(subscriber._id.toString());
                    user.addSubscriber(u);
                });
            }
            if(userDoc.subscriptions !== null) {
                userDoc.subscriptions.forEach((subscription: any) => {
                    const u = new User(subscription.email, subscription.password, subscription.pseudo, subscription.role);
                    u.setId(subscription._id.toString());
                    user.addSubscription(u);
                });
            }
            if(userDoc.playlists !== null) {
                userDoc.playlists.forEach((playlist: any) => {
                    const p = new Playlist(playlist.name, playlist.description, user);
                    p.setId(playlist._id.toString());
                    user.addPlaylist(p);
                });
            }
            if(userDoc.mixers !== null) {
                userDoc.mixers.forEach((mix: any) => {
                    const m = new Music(mix.name, mix.file);
                    m.setId(mix._id.toString());
                    user.addMixer(m);
                });
            }
            if(userDoc.directs !== null) {
                userDoc.directs.forEach((direct: any) => {
                    const d = new Direct(direct.name, direct.description, direct.image, user, direct.date, direct.duration);
                    d.setId(direct._id.toString());
                    user.addDirect(d);
                });
            }
            if(userDoc.guess !== null) {
                userDoc.guess.forEach((guess: any) => {
                    const g = new Direct(guess.name, guess.description, guess.image, user, guess.date, guess.duration);
                    g.setId(guess._id.toString());
                    user.addGuess(g);
                });
            }
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
                if (userDoc.subscribers !== null) {
                    userDoc.subscribers.forEach((subscriber: any) => {
                        const u = new User(subscriber.email, subscriber.password, subscriber.pseudo, subscriber.role);
                        u.setId(subscriber._id.toString());
                        user.addSubscriber(u);
                    });
                }
                if (userDoc.subscriptions !== null) {
                    userDoc.subscriptions.forEach((subscription: any) => {
                        const u = new User(subscription.email, subscription.password, subscription.pseudo, subscription.role);
                        u.setId(subscription._id.toString());
                        user.addSubscription(u);
                    });
                }
                if (userDoc.playlists !== null) {
                    userDoc.playlists.forEach((playlist: any) => {
                        const p = new Playlist(playlist.name, playlist.description, user);
                        p.setId(playlist._id.toString());
                        user.addPlaylist(p);
                    });
                }
                if (userDoc.mixer !== null) {
                    userDoc.mixer.forEach((mix: any) => {
                        const m = new Music(mix.name, mix.file);
                        m.setId(mix._id.toString());
                        user.addMixer(m);
                    });
                }
                if(userDoc.directs !== null) {
                    userDoc.directs.forEach((direct: any) => {
                        const d = new Direct(direct.name, direct.description, direct.image, user, direct.date, direct.duration);
                        d.setId(direct._id.toString());
                        user.addDirect(d);
                    });
                }
                if (userDoc.guess !== null) {
                    userDoc.guess.forEach((guess: any) => {
                        const g = new Direct(guess.name, guess.description, guess.image, user, guess.date, guess.duration);
                        g.setId(guess._id.toString());
                        user.addGuess(g);
                    });
                }
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
            if (userDoc.subscribers !== null) {
                userDoc.subscribers.forEach((subscriber: any) => {
                    const u = new User(subscriber.email, subscriber.password, subscriber.pseudo, subscriber.role);
                    u.setId(subscriber._id.toString());
                    user.addSubscriber(u);
                });
            }
            if (userDoc.subscriptions !== null) {
                userDoc.subscriptions.forEach((subscription: any) => {
                    const u = new User(subscription.email, subscription.password, subscription.pseudo, subscription.role);
                    u.setId(subscription._id.toString());
                    user.addSubscription(u);
                });
            }
            if (userDoc.playlists !== null) {
                userDoc.playlists.forEach((playlist: any) => {
                    const p = new Playlist(playlist.name, playlist.description, user);
                    p.setId(playlist._id.toString());
                    user.addPlaylist(p);
                });
            }
            if (userDoc.mixer !== null) {
                userDoc.mixer.forEach((mix: any) => {
                    const m = new Music(mix.name, mix.file);
                    m.setId(mix._id.toString());
                    user.addMixer(m);
                });
            }
            if(userDoc.directs !== null) {
                userDoc.directs.forEach((direct: any) => {
                    const d = new Direct(direct.name, direct.description, direct.image, user, direct.date, direct.duration);
                    d.setId(direct._id.toString());
                    user.addDirect(d);
                });
            }
            if (userDoc.guess !== null) {
                userDoc.guess.forEach((guess: any) => {
                    const g = new Direct(guess.name, guess.description, guess.image, user, guess.date, guess.duration);
                    g.setId(guess._id.toString());
                    user.addGuess(g);
                });
            }
            return user;
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error finding user by email:", error);
                throw new RepositoryInternalServerErrorException(error.message);
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
            if (userDoc.subscribers !== null) {
                userDoc.subscribers.forEach((subscriber: any) => {
                    const u = new User(subscriber.email, subscriber.password, subscriber.pseudo, subscriber.role);
                    u.setId(subscriber._id.toString());
                    user.addSubscriber(u);
                });
            }
            if (userDoc.subscriptions !== null) {
                userDoc.subscriptions.forEach((subscription: any) => {
                    const u = new User(subscription.email, subscription.password, subscription.pseudo, subscription.role);
                    u.setId(subscription._id.toString());
                    user.addSubscription(u);
                });
            }
            if (userDoc.playlists !== null) {
                userDoc.playlists.forEach((playlist: any) => {
                    const p = new Playlist(playlist.name, playlist.description, user);
                    p.setId(playlist._id.toString());
                    user.addPlaylist(p);
                });
            }
            if (userDoc.mixer !== null) {
                userDoc.mixer.forEach((mix: any) => {
                    const m = new Music(mix.name, mix.file);
                    m.setId(mix._id.toString());
                    user.addMixer(m);
                });
            }
            if(userDoc.directs !== null) {
                userDoc.directs.forEach((direct: any) => {
                    const d = new Direct(direct.name, direct.description, direct.image, user, direct.date, direct.duration);
                    d.setId(direct._id.toString());
                    user.addDirect(d);
                });
            }
            if (userDoc.guess !== null) {
                userDoc.guess.forEach((guess: any) => {
                    const g = new Direct(guess.name, guess.description, guess.image, user, guess.date, guess.duration);
                    g.setId(guess._id.toString());
                    user.addGuess(g);
                });
            }
            return user;
        }catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error finding user by pseudo:", error);
                throw new RepositoryInternalServerErrorException(error.message);
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
                if (userDoc.subscribers !== null) {
                    userDoc.subscribers.forEach((subscriber: any) => {
                        const u = new User(subscriber.email, subscriber.password, subscriber.pseudo, subscriber.role);
                        u.setId(subscriber._id.toString());
                        user.addSubscriber(u);
                    });
                }
                if (userDoc.subscriptions !== null) {
                    userDoc.subscriptions.forEach((subscription: any) => {
                        const u = new User(subscription.email, subscription.password, subscription.pseudo, subscription.role);
                        u.setId(subscription._id.toString());
                        user.addSubscription(u);
                    });
                }
                if (userDoc.playlists !== null) {
                    userDoc.playlists.forEach((playlist: any) => {
                        const p = new Playlist(playlist.name, playlist.description, user);
                        p.setId(playlist._id.toString());
                        user.addPlaylist(p);
                    });
                }
                if (userDoc.mixer !== null) {
                    userDoc.mixer.forEach((mix: any) => {
                        const m = new Music(mix.name, mix.file);
                        m.setId(mix._id.toString());
                        user.addMixer(m);
                    });
                }
                if(userDoc.directs !== null) {
                    userDoc.directs.forEach((direct: any) => {
                        const d = new Direct(direct.name, direct.description, direct.image, user, direct.date, direct.duration);
                        d.setId(direct._id.toString());
                        user.addDirect(d);
                    });
                }
                if (userDoc.guess !== null) {
                    userDoc.guess.forEach((guess: any) => {
                        const g = new Direct(guess.name, guess.description, guess.image, user, guess.date, guess.duration);
                        g.setId(guess._id.toString());
                        user.addGuess(g);
                    });
                }
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
