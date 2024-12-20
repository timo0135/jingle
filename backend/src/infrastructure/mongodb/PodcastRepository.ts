import {PodcastRepositoryInterface} from "../../core/repositoryInterface/PodcastRepositoryInterface";
import Podcast from "../../core/domain/entities/podcast/Podcast";
import {ObjectId} from 'mongodb';
import User from "../../core/domain/entities/user/User";
import {MongoClient, MongoNetworkError, MongoServerSelectionError} from "mongodb";
import RepositoryInternalServerErrorException
    from "../../core/repositoryInterface/RepositoryInternalServerErrorException";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";
import * as console from "node:console";

class PodcastRepository implements PodcastRepositoryInterface {

    private readonly client: Promise<MongoClient>;

    constructor(client: Promise<MongoClient>) {
        this.client = client;
    }

    // ! This method is used to initialize the connection to the database
    async init() {
        const client = await this.client;
        const database = client.db('jingle');
        return database.collection('Podcast');
    }

    async save(podcast: Podcast): Promise<string> {
        try {
            const collection = await this.init();
            if (podcast.getId() === null) {
                const result = await collection.insertOne({
                    date: podcast.getDate(),
                    name: podcast.getName(),
                    description: podcast.getDescription(),
                    creator: new ObjectId(podcast.getCreator()),
                    image: podcast.getImage()
                });
                podcast.setId(result.insertedId.toString());
            } else {
                const existingPodcast = await collection.findOne({_id: new ObjectId(podcast.getId() as string)});
                if (!existingPodcast) {
                    throw new RepositoryNotFoundException("Podcast not found");
                }
                const result = await collection.updateOne({_id: new ObjectId(podcast.getId() as string)}, {
                    $set: {
                        date: podcast.getDate(),
                        name: podcast.getName(),
                        description: podcast.getDescription(),
                        creator: new ObjectId(podcast.getCreator()),
                        image: podcast.getImage()
                    }
                });
            }
            return podcast.getId() as string;
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving podcast:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while saving podcast");
            }
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const collection = await this.init();
            const result = await collection.deleteOne({_id: new ObjectId(id)});
            if (result.deletedCount === 0) {
                throw new RepositoryNotFoundException("Podcast not found");
            }
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error deleting podcast:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while deleting podcast");
            }
        }
    }

    async findAll(): Promise<Podcast[]> {
        try {
            const collection = await this.init();
            const podcastDocs = await collection.find().toArray();
            return podcastDocs.map((podcastDoc: any) => {
                return this.getPodcast(podcastDoc);
            });
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error finding all podcasts:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while finding all podcasts");
            }
        }
    }

    async findById(id: string): Promise<Podcast | null> {
        try {
            const collection = await this.init();
            const podcastDoc = await collection.findOne({_id: new ObjectId(id)});
            if (!podcastDoc) {
                throw new RepositoryNotFoundException("Podcast not found");
            }
            let p = new Podcast(podcastDoc.date, podcastDoc.name, podcastDoc.description, podcastDoc.creator, podcastDoc.image);
            p.setId(podcastDoc._id.toString());
            return p;
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                throw new RepositoryInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while finding podcast by id");
            }
        }
    }

    async getPodcastsByUserId(userId: string): Promise<Podcast[]> {
        try {
            const collection = await this.init();
            const podcastDocs = await collection.find({"creator._id": new ObjectId(userId)}).toArray();
            return podcastDocs.map((podcastDoc: any) => {
                return this.getPodcast(podcastDoc);
            });
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error getting podcasts by user id:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while getting podcasts by user id");
            }
        }
    }

    // ! This method is used to get the user from the podcast document in the database
    private getUser(podcastDoc: any): User {
        try {
            const user = new User(podcastDoc.creator.email, podcastDoc.creator.password, podcastDoc.creator.pseudo, podcastDoc.creator.role);
            user.setId(podcastDoc.creator._id.toString());
            return user;
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error getting user from podcast document:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while getting user from podcast document");
            }
        }
    }

    // ! This method is used to get the podcast from the podcast document in the database
    private getPodcast(podcastDoc: any): Podcast {
        try {
            let p = new Podcast(podcastDoc.date, podcastDoc.name, podcastDoc.description, podcastDoc.creator, podcastDoc.image);
            p.setId(podcastDoc._id.toString());
            return p;
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error getting podcast from podcast document:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while getting podcast from podcast document");
            }
        }
    }

}

export default PodcastRepository;
