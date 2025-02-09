import { config_jingle_db } from '../../config/database';
import pgPromise from 'pg-promise';

const pgp = pgPromise();

export const db_jingle = pgp(config_jingle_db);
