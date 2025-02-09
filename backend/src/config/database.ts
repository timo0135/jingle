import dotenv from 'dotenv';
import * as fs from "fs";
import * as ini from "ini";

dotenv.config();

export const mongoConfig = {
    uri: process.env.MONGO_URI,
    databaseName: process.env.MONGO_DB_NAME,
};

const user_db_ini = ini.parse(fs.readFileSync('/app/src/config/jingle.db.ini', 'utf-8'))
export const config_jingle_db = {
    host: user_db_ini.database.host,
    database: user_db_ini.database.database,
    user: user_db_ini.database.user,
    password: user_db_ini.database.password,
};


