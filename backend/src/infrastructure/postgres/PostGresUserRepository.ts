import UserRepositoryInterface from "../../core/repositoryInterface/UserRepositoryInterface";
import User from "../../core/domain/entities/user/User";
import { v4 as uuidv4 } from 'uuid';
import { errors } from 'pg-promise';
import RepositoryInternalServerErrorException
    from "../../core/repositoryInterface/RepositoryInternalServerErrorException";
import RepositoryNotFoundException from "../../core/repositoryInterface/RepositoryNotFoundException";


class PostGresUserRepository implements UserRepositoryInterface {
    private db;

    constructor(db: any) {
        this.db = db;
    }
    async delete(id: string): Promise<void> {
        try{
            await this.db.none('DELETE FROM users WHERE id = $1', id);
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('User not found');
                }
            }
            console.error('Error deleting user:', error);
            throw new RepositoryInternalServerErrorException('Unable to delete user');
        }
    }

    async find(id: string): Promise<User> {
        try{
            let user_response = await this.db.one('SELECT * FROM users WHERE id = $1', id);
            let user_subscribers = await this.db.any('SELECT listener_id FROM subscriber WHERE creator_id = $1', id);
            let user_subscriptions = await this.db.any('SELECT creator_id FROM subscriber WHERE listener_id = $1', id);
            let user_playlists = await this.db.any('SELECT id FROM playlist WHERE user_id = $1', id);
            let user_mixers = await this.db.any('SELECT music_id FROM mixer WHERE user_id = $1', id);
            let user_directs = await this.db.any('SELECT id FROM direct WHERE host_id = $1', id);
            let user_guesses = await this.db.any('SELECT direct_id FROM guess WHERE user_id = $1', id);
            let user: User = new User(user_response.email, user_response.password, user_response.pseudo, user_response.role);
            user.setId(user_response.id);
            user.setSubscribers(user_subscribers);
            user.setSubscriptions(user_subscriptions);
            user.setPlaylists(user_playlists);
            user.setMixers(user_mixers);
            user.setDirects(user_directs);
            user.setGuess(user_guesses);
            return user;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('User not found');
                }
            }
            console.error('Error getting user:', error);
            throw new RepositoryInternalServerErrorException('Unable to get user');
        }
    }

    async findAll(): Promise<User[]> {
        try{
            let users_response = await this.db.any('SELECT * FROM users');
            let users = users_response.map(async (user: any) => {
                let user_subscribers = await this.db.any('SELECT listener_id FROM subscriber WHERE creator_id = $1', user.id);
                let user_subscriptions = await this.db.any('SELECT creator_id FROM subscriber WHERE listener_id = $1', user.id);
                let user_playlists = await this.db.any('SELECT id FROM playlist WHERE user_id = $1', user.id);
                let user_mixers = await this.db.any('SELECT music_id FROM mixer WHERE user_id = $1', user.id);
                let user_directs = await this.db.any('SELECT id FROM direct WHERE host_id = $1', user.id);
                let user_guesses = await this.db.any('SELECT direct_id FROM guess WHERE user_id = $1', user.id);
                let u: User = new User(user.email, user.password, user.pseudo, user.role);
                u.setId(user.id);
                u.setSubscribers(user_subscribers);
                u.setSubscriptions(user_subscriptions);
                u.setPlaylists(user_playlists);
                u.setMixers(user_mixers);
                u.setDirects(user_directs);
                u.setGuess(user_guesses);
                return u;
            });
            return Promise.all(users);
        }catch (error) {
            console.error('Error getting all users:', error);
            throw new RepositoryInternalServerErrorException('Unable to get all users');
        }
    }

    async getByEmail(email: string): Promise<User> {
        try{
            let user_response = await this.db.one('SELECT * FROM users WHERE email = $1', email);
            let user_subscribers = await this.db.any('SELECT listener_id FROM subscriber WHERE creator_id = $1', user_response.id);
            let user_subscriptions = await this.db.any('SELECT creator_id FROM subscriber WHERE listener_id = $1', user_response.id);
            let user_playlists = await this.db.any('SELECT id FROM playlist WHERE user_id = $1', user_response.id);
            let user_mixers = await this.db.any('SELECT music_id FROM mixer WHERE user_id = $1', user_response.id);
            let user_directs = await this.db.any('SELECT id FROM direct WHERE host_id = $1', user_response.id);
            let user_guesses = await this.db.any('SELECT direct_id FROM guess WHERE user_id = $1', user_response.id);
            let user: User = new User(user_response.email, user_response.password, user_response.pseudo, user_response.role);
            user.setId(user_response.id);
            user.setSubscribers(user_subscribers);
            user.setSubscriptions(user_subscriptions);
            user.setPlaylists(user_playlists);
            user.setMixers(user_mixers);
            user.setDirects(user_directs);
            user.setGuess(user_guesses);
            return user;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('User not found');
                }
            }
            console.error('Error getting user by email:', error);
            throw new RepositoryInternalServerErrorException('Unable to get user by email');
        }
    }

    async getByPseudo(pseudo: string): Promise<User> {
        try{
            let user_response = await this.db.one('SELECT * FROM users WHERE pseudo = $1', pseudo);
            let user_subscribers = await this.db.any('SELECT listener_id FROM subscriber WHERE creator_id = $1', user_response.id);
            let user_subscriptions = await this.db.any('SELECT creator_id FROM subscriber WHERE listener_id = $1', user_response.id);
            let user_playlists = await this.db.any('SELECT id FROM playlist WHERE user_id = $1', user_response.id);
            let user_mixers = await this.db.any('SELECT music_id FROM mixer WHERE user_id = $1', user_response.id);
            let user_directs = await this.db.any('SELECT id FROM direct WHERE host_id = $1', user_response.id);
            let user_guesses = await this.db.any('SELECT direct_id FROM guess WHERE user_id = $1', user_response.id);
            let user: User = new User(user_response.email, user_response.password, user_response.pseudo, user_response.role);
            user.setId(user_response.id);
            user.setSubscribers(user_subscribers);
            user.setSubscriptions(user_subscriptions);
            user.setPlaylists(user_playlists);
            user.setMixers(user_mixers);
            user.setDirects(user_directs);
            user.setGuess(user_guesses);
            return user;
        }catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryNotFoundException('User not found');
                }
            }
            console.error('Error getting user by pseudo:', error);
            throw new RepositoryInternalServerErrorException('Unable to get user by pseudo');
        }
    }

    async getsByRole(role: string): Promise<User[]> {
        try{
            let users_response = await this.db.any('SELECT * FROM users WHERE role = $1', role);
            let users = users_response.map(async (user: any) => {
                let user_subscribers = await this.db.any('SELECT listener_id FROM subscriber WHERE creator_id = $1', user.id);
                let user_subscriptions = await this.db.any('SELECT creator_id FROM subscriber WHERE listener_id = $1', user.id);
                let user_playlists = await this.db.any('SELECT id FROM playlist WHERE user_id = $1', user.id);
                let user_mixers = await this.db.any('SELECT music_id FROM mixer WHERE user_id = $1', user.id);
                let user_directs = await this.db.any('SELECT id FROM direct WHERE host_id = $1', user.id);
                let user_guesses = await this.db.any('SELECT direct_id FROM guess WHERE user_id = $1', user.id);
                let u: User = new User(user.email, user.password, user.pseudo, user.role);
                u.setId(user.id);
                u.setSubscribers(user_subscribers);
                u.setSubscriptions(user_subscriptions);
                u.setPlaylists(user_playlists);
                u.setMixers(user_mixers);
                u.setDirects(user_directs);
                u.setGuess(user_guesses);
                return u;
            });
            return Promise.all(users);
        }catch (error) {
            console.error('Error getting all users:', error);
            throw new RepositoryInternalServerErrorException('Unable to get all users');
        }
    }

    async save(user: User): Promise<string> {
        try{
            if (user.getId() === null) {
                let id = uuidv4();
                await this.db.none('INSERT INTO users(id, email, password, pseudo, role) VALUES($1, $2, $3, $4, $5)', [id, user.getEmail(), user.getPassword(), user.getPseudo(), user.getRole()]);

                user.setId(id);
            } else {
                await this.db.none('UPDATE users SET email = $1, password = $2, pseudo = $3, role = $4 WHERE id = $5', [user.getEmail(), user.getPassword(), user.getPseudo(), user.getRole(), user.getId()]);
            }
            return user.getId() as string;
        } catch (error) {
            if (error instanceof errors.QueryResultError) {
                if (error.code === errors.queryResultErrorCode.noData) {
                    throw new RepositoryInternalServerErrorException('No data returned from the query');
                } else if (error.code === errors.queryResultErrorCode.notEmpty) {
                    throw new RepositoryInternalServerErrorException('Query returned unexpected data');
                }
            } else if (error instanceof Error) {
                if (error.message.includes('23505')) {
                    throw new RepositoryInternalServerErrorException('User with this email already exists');
                } else if (error.message.includes('23503')) {
                    throw new RepositoryInternalServerErrorException('Foreign key violation');
                }
            }
            console.error('Error saving user:', error);
            throw new RepositoryInternalServerErrorException('Unable to save user');
        }
    }

}

export default PostGresUserRepository;
