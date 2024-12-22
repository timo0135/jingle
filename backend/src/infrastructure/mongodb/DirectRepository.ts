import DirectRepositoryInterface from "../../core/repositoryInterface/DirectRepositoryInterface";
import Direct from "../../core/domain/entities/direct/Direct";
import {MongoClient, MongoNetworkError, MongoServerSelectionError, ObjectId} from "mongodb";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";
import console from "node:console";
import RepositoryInternalServerErrorException from "../../core/repositoryInterface/RepositoryInternalServerErrorException";

class DirectRepository implements DirectRepositoryInterface {
    private readonly client: Promise<MongoClient>;

    constructor(client: Promise<MongoClient>) {
        this.client = client;
    }

    async initCollectionDirect() {
        const client = await this.client;
        const database = client.db('jingle');
        return database.collection('Direct');
    }
    async delete(id: string): Promise<void> {
        try {
            const collection = await this.initCollectionDirect();
            const result = await collection.deleteOne({_id: new ObjectId(id)});
            if (result.deletedCount === 0) {
                throw new RepositoryNotFoundException("Direct not found");
            }
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving direct:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while deleting direct");
            }
        }
    }

    async find(id: string): Promise<Direct> {
        try{
            const collection = await this.initCollectionDirect();
            const result = await collection.findOne({_id: new ObjectId(id)});
            if (result === null) {
                throw new RepositoryNotFoundException("Direct not found");
            }
            const direct = new Direct(result.name, result.description, result.image, result.host, result.date, result.duration);
            direct.setGuess(result.guess);
            direct.setId(result._id.toString());
            return direct;
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving direct:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while finding direct");
            }
        }
    }

    async findAll(): Promise<Direct[]> {
        try{
            const collection = await this.initCollectionDirect();
            const result = await collection.find().toArray();
            return result.map((direct) => {
                const d = new Direct(direct.name, direct.description, direct.image, direct.host, direct.date, direct.duration);
                d.setGuess(direct.guess);
                d.setId(direct._id.toString());
                return d;
            });
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving direct:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while fetching directs");
            }
        }
    }

    async findByUserId(userId: string): Promise<Direct[]> {
        try{
            const collection = await this.initCollectionDirect();
            const result = await collection.find({host: userId}).toArray();
            return result.map((direct) => {
                const d = new Direct(direct.name, direct.description, direct.image, direct.host, direct.date, direct.duration);
                d.setGuess(direct.guess);
                d.setId(direct._id.toString());
                return d;
            });
        } catch (error) {
            if (error instanceof MongoNetworkError || error instanceof MongoServerSelectionError) {
                console.error("Error saving direct:", error);
                throw new RepositoryInternalServerErrorException(error.message);
            } if (error instanceof RepositoryNotFoundException) {
                throw new RepositoryNotFoundException(error.message);
            } else {
                throw new RepositoryInternalServerErrorException("An error occurred while fetching directs");
            }
        }
    }

    async save(direct: Direct): Promise<string> {
        const collection = await this.initCollectionDirect();
        if (direct.getId() === null) {
            const result = await collection.insertOne({
                name: direct.getName(),
                description: direct.getDescription(),
                image: direct.getImage(),
                host: direct.getHost(),
                date: direct.getDate(),
                duration: direct.getDuration(),
                guess: direct.getGuess(),
            });
            direct.setId(result.insertedId.toString());
        } else {
            await collection.updateOne({_id: new ObjectId(direct.getId() as string)}, {
                $set: {
                    name: direct.getName(),
                    description: direct.getDescription(),
                    image: direct.getImage(),
                    host: direct.getHost(),
                    date: direct.getDate(),
                    duration: direct.getDuration(),
                    guess: direct.getGuess(),
                }
            });
        }
        return direct.getId() as string;
    }

}

export default DirectRepository;
