import * as mongoDB from "mongodb";
import { mongoConfig } from '../../config/database';

export const getMongoClient = async (): Promise<mongoDB.MongoClient> => {
    try {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://admin:pass@mongodb");
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
