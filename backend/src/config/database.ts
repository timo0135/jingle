import dotenv from 'dotenv';

dotenv.config();

export const mongoConfig = {
    uri: process.env.MONGO_URI,
    databaseName: process.env.MONGO_DB_NAME,
};
