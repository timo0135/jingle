const pgp = require('pg-promise')();

// Configuration de la connexion à la base de données
const connectionString = 'postgresql://root:pass@jingle.db:5432/jingle';
const db = pgp(connectionString);

async function createDatabaseAndTables() {
    const tables = [
        `CREATE TABLE IF NOT EXISTS "users" (
            id UUID PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            pseudo VARCHAR(255) UNIQUE NOT NULL,
            role INT NOT NULL
        )`,
        // `CREATE TABLE IF NOT EXISTS "Music" (
        //     id UUID PRIMARY KEY,
        //     title VARCHAR(255) NOT NULL,
        //     artist VARCHAR(255) NOT NULL,
        //     album VARCHAR(255),
        //     genre VARCHAR(50),
        //     release_date DATE
        // )`,
        `CREATE TABLE IF NOT EXISTS "direct" (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description varchar(255),
            image VARCHAR(255),
            host_id UUID NOT NULL,
            date TIMESTAMP NOT NULL,
            duration INT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS "guess" (
            direct_id UUID,
            user_id UUID,
            PRIMARY KEY (direct_id, user_id)
        )`,
        `CREATE TABLE IF NOT EXISTS "subscriber" (
            listener_id UUID,
            creator_id UUID,
            PRIMARY KEY (listener_id, creator_id)
        )`,
        `CREATE TABLE IF NOT EXISTS "podcast" (
            id UUID PRIMARY KEY,
            date TIMESTAMP NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            host_id UUID NOT NULL,
            image VARCHAR(255)
        )`,
        `CREATE TABLE IF NOT EXISTS "avis" (
            id UUID PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            podcast_id UUID NOT NULL,
            user_id UUID NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS "content" (
            playlist_id UUID,
            podcast_id UUID,
            PRIMARY KEY (playlist_id, podcast_id)
        )`,
        `CREATE TABLE IF NOT EXISTS "playlist" (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            user_id UUID NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS "mixer" (
            user_id UUID,
            music_id UUID,
            PRIMARY KEY (user_id, music_id)
        )`
    ];

    try {
        // Créer les tables
        for (let table of tables) {
            await db.none(table);
        }

        console.log('Base de données et tables créées avec succès !');

    } catch (error) {
        console.error('Erreur lors de la création de la base de données ou des tables :', error);
    } finally {
        pgp.end();
    }
}

createDatabaseAndTables();
