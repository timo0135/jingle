import * as mongoDB from "mongodb";
import { mongoConfig } from '../../config/database';

export const getMongoClient = async (): Promise<mongoDB.MongoClient> => {
    const uri = "mongodb://mongodb:27017";
    if (!uri) {
        throw new Error('Mongo URI not found');
    }
    try {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB successfully at URI:', uri);
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
