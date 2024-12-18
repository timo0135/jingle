import { PodcastRepositoryInterface } from "../../core/repositoryInterface/PodcastRepositoryInterface";
import Podcast from "../../core/domain/entities/podcast/Podcast";
import { getMongoClient } from "./MongoClient";
import { ObjectId } from 'mongodb';
import {mongoConfig} from "../../config/database";
import User from "../../core/domain/entities/user/User";

class PodcastRepository implements PodcastRepositoryInterface {
    async findById(id: string): Promise<Podcast | null> {
        const client = await getMongoClient();
        const database = client.db('jingle');
        const collection = database.collection('Podcast');

        try {
            const podcastDoc = await collection.findOne({ _id: new ObjectId(id) });
            if (!podcastDoc) {
                return null;
            }
            const user = new User(podcastDoc.creator.email, podcastDoc.creator.password, podcastDoc.creator.pseudo, podcastDoc.creator.role);
            user.setId(podcastDoc.creator._id.toString());
            let p = new Podcast(podcastDoc.date, podcastDoc.name, podcastDoc.description, user, podcastDoc.image);
            p.setId(podcastDoc._id.toString());
            return p;
        } catch (error) {
            console.error("Error finding podcast by ID:", error);
            return null;
        }
    }

    async findAll(): Promise<Podcast[]> {
        console.log("mbappé");
        const client = await getMongoClient();
        const database = client.db('jingle');
        const collection = database.collection('Podcast');

        try {
            const podcastDocs = await collection.find().toArray();
            return podcastDocs.map((podcastDoc: any) => {
                const user = new User(podcastDoc.creator.email, podcastDoc.creator.password, podcastDoc.creator.pseudo, podcastDoc.creator.role);
                user.setId(podcastDoc.creator._id.toString());
                let p = new Podcast(podcastDoc.date, podcastDoc.name, podcastDoc.description, user, podcastDoc.image);
                p.setId(podcastDoc._id.toString());
                return p;
            });
        } catch (error) {
            console.error("Error finding all podcasts:", error);
            return [];
        }
    }
}

export default PodcastRepository;
