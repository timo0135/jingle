import { MongoClient } from 'mongodb';
import { mongoConfig } from '../../config/database';
let mongoClient: MongoClient;

export const getMongoClient = async (): Promise<MongoClient> => {
    if (!mongoClient) {
        const mongoUri = 'mongodb://admin:pass@localhost:27017';
        mongoClient = new MongoClient(mongoUri);
        await mongoClient.connect();
    }
    return mongoClient;
};
