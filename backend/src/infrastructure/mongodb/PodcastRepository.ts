import { PodcastRepositoryInterface } from "../../core/repositoryInterface/PodcastRepositoryInterface";
import Podcast from "../../core/domain/entities/podcast/Podcast";
import { getMongoClient } from "./MongoClient";
import { ObjectId } from 'mongodb';
import {mongoConfig} from "../../config/database";

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
            return new Podcast(podcastDoc.date, podcastDoc.name, podcastDoc.description, podcastDoc.creator, podcastDoc.image);
        } catch (error) {
            console.error("Error finding podcast by ID:", error);
            return null;
        }
    }
}

export default PodcastRepository;
