import DirectRepositoryInterface from "../../core/repositoryInterface/DirectRepositoryInterface";
import Direct from "../../core/domain/entities/direct/Direct";
import RepositoryInternalServerErrorException
    from "../../core/repositoryInterface/RepositoryInternalServerErrorException";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";
import { errors } from 'pg-promise';
import { v4 as uuidv4 } from 'uuid';

class PostGresDirectRepository implements DirectRepositoryInterface {
    private db;

    constructor(db: any) {
        this.db = db;
    }

    async delete(id: string): Promise<void> {
        try{
            await this.db.none('DELETE FROM direct WHERE id = $1', id);
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Direct not found');
                }
            }
            console.error('Error deleting direct:', error);
            throw new RepositoryInternalServerErrorException('Unable to delete direct');
        }
    }

    async find(id: string): Promise<Direct> {
        try{
            let direct_response = await this.db.one('SELECT * FROM direct WHERE id = $1', id);
            let direct_guests_response = await this.db.any('SELECT user_id FROM guess WHERE direct_id = $1', id);
            let direct = new Direct(direct_response.name, direct_response.description, direct_response.image, direct_response.host_id, direct_response.date, direct_response.duration);
            direct.setId(direct_response.id);
            direct.setGuess(direct_guests_response.map((guest: any) => guest.user_id));
            return direct;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('Direct not found');
                }
            }
            console.error('Error getting direct:', error);
            throw new RepositoryInternalServerErrorException('Unable to get direct');
        }
    }

    async findAll(): Promise<Direct[]> {
        try {
            let directs_response = await this.db.any('SELECT * FROM direct');
            return directs_response.map(async (direct: any) => {
                let direct_guests_response = this.db.any('SELECT user_id FROM guess WHERE direct_id = $1', direct.id);
                let d = new Direct(direct.name, direct.description, direct.image, direct.host_id, direct.date, direct.duration);
                d.setId(direct.id);
                let guests = await direct_guests_response;
                if (guests.length > 0) {
                    d.setGuess(direct_guests_response);
                }
                return d;
            });
        }catch (error) {
            console.error('Error getting all directs:', error);
            throw new RepositoryInternalServerErrorException('Unable to get all directs');
        }
    }

    async findByUserId(userId: string): Promise<Direct[]> {
        try {
            let directs_response = await this.db.any('SELECT * FROM direct WHERE host_id = $1', userId);
            return directs_response.map(async (direct: any) => {
                let direct_guests_response = this.db.any('SELECT user_id FROM guess WHERE direct_id = $1', direct.id);
                let d = new Direct(direct.name, direct.description, direct.image, direct.host_id, direct.date, direct.duration);
                d.setId(direct.id);
                let guests = await direct_guests_response;
                d.setGuess(guests.map((guest: any) => guest.user_id));
                return d;
            });
        }catch (error) {
            console.error('Error getting all directs:', error);
            throw new RepositoryInternalServerErrorException('Unable to get all directs');
        }
    }

    async save(direct: Direct): Promise<string> {
        try {
            if (direct.getId() === null) {
                let id = uuidv4();
                await this.db.none('INSERT INTO direct(id, name, description, image, host_id, date, duration) VALUES($1, $2, $3, $4, $5, $6, $7)', [id, direct.getName(), direct.getDescription(), direct.getImage(), direct.getHost(), direct.getDate(), direct.getDuration()]);
                direct.setId(id);
            } else {
                await this.db.none('UPDATE direct SET name = $1, description = $2, image = $3, host_id = $4, date = $5, duration = $6 WHERE id = $7', [direct.getName(), direct.getDescription(), direct.getImage(), direct.getHost(), direct.getDate(), direct.getDuration(), direct.getId()]);
                await this.db.none('DELETE FROM guess WHERE direct_id = $1', [direct.getId()]);
                let guess = direct.getGuess();
                for (let i = 0; i < guess.length; i++) {
                    await this.db.none('INSERT INTO guess(user_id, direct_id) VALUES($1, $2) ON CONFLICT DO NOTHING', [guess[i], direct.getId()]);
                }
            }
            return direct.getId() as string;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryInternalServerErrorException('No data returned from the query');
                } else if (error.code === errors.queryResultErrorCode.notEmpty) {
                    throw new RepositoryInternalServerErrorException('Query returned unexpected data');
                }
            } else if (error instanceof Error) {
                if (error.message.includes('23505')) {
                    throw new RepositoryInternalServerErrorException('Direct with this name already exists');
                } else if (error.message.includes('23503')) {
                    throw new RepositoryInternalServerErrorException('Foreign key violation');
                }
            }
            console.error('Error saving direct:', error);
            throw new RepositoryInternalServerErrorException('Unable to save direct');
        }
    }

}

export default PostGresDirectRepository;
