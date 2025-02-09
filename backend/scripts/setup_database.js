const { MongoClient } = require('mongodb');

// ! Configuration de la connexion à la base de données
const uri = 'mongodb://mongodb:27017';
const dbName = 'jingle';

async function createDatabaseAndCollections() {
    let client;
    const collections = ['User', 'Music', 'Direct', 'Guests', 'Mover', 'Subscriber', 'Podcast', 'Avis', 'Content', 'Playlist'];

    try {
        client = new MongoClient(uri);

        await client.connect();

        // ! Créer la base de données
        const db = client.db(dbName);

        // ! Créer les collections vides
        for (let collection of collections) {
            await db.createCollection(collection);
        }

        console.log('Base de données et collections créées avec succès !');

    } catch (error) {
        console.error('Erreur lors de la création de la base de données ou des collections :', error);
    } finally {
        await client.close();
    }
}

createDatabaseAndCollections();
