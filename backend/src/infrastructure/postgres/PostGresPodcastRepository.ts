import {PodcastRepositoryInterface} from "../../core/repositoryInterface/PodcastRepositoryInterface";
import Podcast from "../../core/domain/entities/podcast/Podcast";
import Avis from "../../core/domain/entities/avis/Avis";
import {errors} from "pg-promise";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";
import RepositoryInternalServerErrorException
    from "../../core/repositoryInterface/RepositoryInternalServerErrorException";
import {v4 as uuidv4} from 'uuid';

class PostGresPodcastRepository implements PodcastRepositoryInterface {
    private db;

    constructor(db: any) {
        this.db = db;
    }
    async delete(id: string): Promise<void> {
        try{
            await this.db.none('DELETE FROM podcast WHERE id = $1', id);
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Podcast not found');
                }
            }
            console.error('Error deleting podcast:', error);
            throw new RepositoryInternalServerErrorException('Unable to delete podcast');
        }
    }

    async deleteAvis(id: string): Promise<void> {
        try {
            await this.db.none('DELETE FROM avis WHERE id = $1', id);
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Avis not found');
                }
            }
            console.error('Error deleting avis:', error);
            throw new RepositoryInternalServerErrorException('Unable to delete avis');
        }
    }

    async findAll(): Promise<Podcast[]> {
        try {
            let podcasts_response = await this.db.any('SELECT * FROM podcast');
            return podcasts_response.map(async (podcast: any) => {
                let podcast_content = await this.db.any('SELECT playlist_id FROM content WHERE podcast_id = $1', podcast.id);
                let podcast_avis = await this.db.any('SELECT id FROM avis WHERE podcast_id = $1', podcast.id);
                let p = new Podcast(podcast.date, podcast.name, podcast.description, podcast.host_id, podcast.image, podcast.file);
                p.setId(podcast.id);
                p.setContent(podcast_content);
                p.setAvis(podcast_avis);
                return p;
            });
        }catch (error) {
            console.error('Error getting all podcasts:', error);
            throw new RepositoryInternalServerErrorException('Unable to get all podcasts');
        }
    }

    async findAvisById(id: string): Promise<Avis> {
        try{
            let avis_response = await this.db.one('SELECT * FROM avis WHERE id = $1', id);
            let avis = new Avis(avis_response.title, avis_response.description, avis_response.podcast_id, avis_response.user_id);
            avis.setId(avis_response.id);
            return avis;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Avis not found');
                }
            }
            console.error('Error getting avis by id:', error);
            throw new RepositoryInternalServerErrorException('Unable to get avis by id');
        }
    }

    async findById(id: string): Promise<Podcast> {
        try{
            let podcast_response = await this.db.one('SELECT * FROM podcast WHERE id = $1', id);
            let podcast_content = await this.db.any('SELECT playlist_id FROM content WHERE podcast_id = $1', id);
            let podcast_avis = await this.db.any('SELECT id FROM avis WHERE podcast_id = $1', id);
            let p = new Podcast(podcast_response.date, podcast_response.name, podcast_response.description, podcast_response.host_id, podcast_response.image, podcast_response.file);
            p.setId(podcast_response.id);
            p.setContent(podcast_content);
            p.setAvis(podcast_avis);
            return p;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Podcast not found');
                }
            }
            console.error('Error getting podcast by id:', error);
            throw new RepositoryInternalServerErrorException('Unable to get podcast by id');
        }
    }

    async getAvisByPodcastId(podcastId: string): Promise<Avis[]> {
        try {
            let avis_response = await this.db.any('SELECT * FROM avis WHERE podcast_id = $1', podcastId);
            return avis_response.map((avis: any) => {
                let a = new Avis(avis.title, avis.description, avis.podcast_id, avis.user_id);
                a.setId(avis.id);
                return a;
            });
        }catch (error) {
            console.error('Error getting avis by podcast id:', error);
            throw new RepositoryInternalServerErrorException('Unable to get avis by podcast id');
        }
    }

    async getAvisByUserId(userId: string): Promise<Avis[]> {
        try {
            let avis_response = await this.db.any('SELECT * FROM avis WHERE user_id = $1', userId);
            return avis_response.map((avis: any) => {
                let a = new Avis(avis.title, avis.description, avis.podcast_id, avis.user_id);
                a.setId(avis.id);
                return a;
            });
        }catch (error) {
            console.error('Error getting avis by user id:', error);
            throw new RepositoryInternalServerErrorException('Unable to get avis by user id');
        }
    }

    async getPodcastsByUserId(userId: string): Promise<Podcast[]> {
        try{
            let podcasts_response = await this.db.any('SELECT * FROM podcast WHERE host_id = $1', userId);
            return podcasts_response.map(async (podcast: any) => {
                let podcast_content = await this.db.any('SELECT playlist_id FROM content WHERE podcast_id = $1', podcast.id);
                let podcast_avis = await this.db.any('SELECT id FROM avis WHERE podcast_id = $1', podcast.id);
                let p = new Podcast(podcast.date, podcast.name, podcast.description, podcast.host_id, podcast.image, podcast.file);
                p.setId(podcast.id);
                p.setContent(podcast_content);
                p.setAvis(podcast_avis);
                return p;
            });
        }catch (error) {
            console.error('Error getting podcasts by user id:', error);
            throw new RepositoryInternalServerErrorException('Unable to get podcasts by user id');
        }
    }

    async save(podcast: Podcast): Promise<string> {
        try{
            if (podcast.getId() === null) {
                let id = uuidv4();
                this.db.none('INSERT INTO podcast(id, date, name, description, host_id, image, file) VALUES($1, $2, $3, $4, $5, $6, $7)', [id, podcast.getDate(), podcast.getName(), podcast.getDescription(), podcast.getCreator(), podcast.getImage(), podcast.getFile()]);
                podcast.setId(id);
            }else{
                this.db.none('UPDATE podcast SET date = $1, name = $2, description = $3, host_id = $4, image = $5, file = $6 WHERE id = $7', [podcast.getDate(), podcast.getName(), podcast.getDescription(), podcast.getCreator(), podcast.getImage(), podcast.getFile(), podcast.getId()]);
            }
            return podcast.getId() as string;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryInternalServerErrorException('No data returned from the query');
                } else if (error.code === errors.queryResultErrorCode.notEmpty) {
                    throw new RepositoryInternalServerErrorException('Query returned unexpected data');
                }
            } else if (error instanceof Error) {
                if (error.message.includes('23505')) {
                    throw new RepositoryInternalServerErrorException('Podcast with this name already exists');
                } else if (error.message.includes('23503')) {
                    throw new RepositoryInternalServerErrorException('Foreign key violation');
                }
            }
            console.error('Error saving podcast:', error);
            throw new RepositoryInternalServerErrorException('Unable to save podcast');
        }
    }

    async saveAvis(avis: Avis): Promise<string> {
        try {
            if (avis.getId() === null) {
                let id = uuidv4();
                this.db.none('INSERT INTO avis(id, title, description, podcast_id, user_id) VALUES($1, $2, $3, $4, $5)', [id, avis.getTitle(), avis.getContent(), avis.getPodcast(), avis.getUserId()]);
                avis.setId(id);
            }else{
                this.db.none('UPDATE avis SET title = $1, description = $2, podcast_id = $3, user_id = $4 WHERE id = $5', [avis.getTitle(), avis.getContent(), avis.getPodcast(), avis.getUserId(), avis.getId()]);
            }
            return avis.getId() as string;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryInternalServerErrorException('No data returned from the query');
                } else if (error.code === errors.queryResultErrorCode.notEmpty) {
                    throw new RepositoryInternalServerErrorException('Query returned unexpected data');
                }
            } else if (error instanceof Error) {
                if (error.message.includes('23505')) {
                    throw new RepositoryInternalServerErrorException('Avis with this title already exists');
                } else if (error.message.includes('23503')) {
                    throw new RepositoryInternalServerErrorException('Foreign key violation');
                }
            }
            console.error('Error saving avis:', error);
            throw new RepositoryInternalServerErrorException('Unable to save avis');
        }
    }

}

export default PostGresPodcastRepository;
