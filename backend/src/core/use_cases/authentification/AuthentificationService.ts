import AuthentificationServiceInterface from "./AuthentificationServiceInterface";
import DisplayUserDTO from "../../../adapters/dto/user/DisplayUserDTO";
import AuthentificationServiceNotFoundException from "./AuthentificationServiceNotFoundException";
import AuthentificationServiceBadDataException from "./AuthentificationServiceBadDataException";
import AuthentificationServiceInternalServerErrorException from "./AuthentificationServiceInternalServerErrorException";
import RepositoryNotFoundException from "../../repositoryInterface/RepositoryNotFoundException";
import bcrypt from "bcrypt";
import UserRepositoryInterface from "../../repositoryInterface/UserRepositoryInterface";
import RepositoryInternalServerErrorException from "../../repositoryInterface/RepositoryInternalServerErrorException";
import User from "../../domain/entities/user/User";


class AuthentificationService implements AuthentificationServiceInterface {

    private instance: UserRepositoryInterface;

    constructor(instance: UserRepositoryInterface) {
        this.instance = instance;
    }
    async credentials(password: string, email?: string, pseudo?: string): Promise<DisplayUserDTO> {
        try {
            let user = undefined;
            if (email !== undefined) {
                user = await this.instance.getByEmail(email);
            } else if (pseudo !== undefined) {
                user = await this.instance.getByPseudo(pseudo);
            }else{
                throw new AuthentificationServiceBadDataException("Invalid credentials");
            }
            if (user === null) {
                throw new AuthentificationServiceNotFoundException("User not found");
            }
            if (!bcrypt.compareSync(password, user.getPassword())) {
                throw new AuthentificationServiceBadDataException("Invalid password");
            }
            return new DisplayUserDTO(user);
        } catch (error) {
            this.handleErrors(error);
            throw new AuthentificationServiceInternalServerErrorException("An unexpected error occurred");

        }
    }

    async getUser(id: string): Promise<DisplayUserDTO> {
        try{
            let user = await this.instance.find(id);
            if (user === null) {
                throw new AuthentificationServiceNotFoundException("User not found");
            }
            return new DisplayUserDTO(user);

        }catch (error){
            this.handleErrors(error);
            throw new AuthentificationServiceInternalServerErrorException("An unexpected error occurred");
        }
    }

    async getUserByEmail(email: string): Promise<DisplayUserDTO> {
        try{
            let user = await this.instance.getByEmail(email);
            if (user === null) {
                throw new AuthentificationServiceNotFoundException("User not found");
            }
            return new DisplayUserDTO(user);
        } catch (error) {
            this.handleErrors(error);
            throw new AuthentificationServiceInternalServerErrorException("An unexpected error occurred");
        }
    }

    async getUserByPseudo(pseudo: string): Promise<DisplayUserDTO> {
        try{
            let user = await this.instance.getByEmail(pseudo);
            if (user === null) {
                throw new AuthentificationServiceNotFoundException("User not found");
            }
            return new DisplayUserDTO(user);
        } catch (error) {
            this.handleErrors(error);
            throw new AuthentificationServiceInternalServerErrorException("An unexpected error occurred");
        }
    }

    async register(email: string, pseudo: string, password: string): Promise<DisplayUserDTO> {
        try {
            let user;
            try {
                user = await this.instance.getByEmail(email);
                user = await this.instance.getByPseudo(pseudo);
            } catch (error) {
                if (error instanceof RepositoryNotFoundException) {
                    user = null;
                } else {
                    throw error;
                }
            }

            if (user !== null) {
                throw new AuthentificationServiceBadDataException("User already exists");
            }

            let hash = bcrypt.hashSync(password, 10);
            user = new User(email, hash, pseudo, 1);
            await this.instance.save(user);
            return new DisplayUserDTO(user);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new AuthentificationServiceInternalServerErrorException(error.message);
            }
            if (error instanceof AuthentificationServiceBadDataException) {
                throw new AuthentificationServiceBadDataException(error.message);
            }
            throw new AuthentificationServiceInternalServerErrorException("Unable to register user" + error);
        }
    }

    handleErrors(error: any): void {
        if (error instanceof AuthentificationServiceNotFoundException) {
            throw new AuthentificationServiceNotFoundException(error.message);
        } else if (error instanceof AuthentificationServiceBadDataException) {
            throw new AuthentificationServiceBadDataException(error.message);
        } else if (error instanceof AuthentificationServiceInternalServerErrorException) {
            throw new AuthentificationServiceInternalServerErrorException(error.message);
        } else if (error instanceof RepositoryNotFoundException) {
            throw new AuthentificationServiceNotFoundException(error.message);
        } else if (error instanceof RepositoryInternalServerErrorException) {
            throw new AuthentificationServiceInternalServerErrorException(error.message);
        } else {
            throw new AuthentificationServiceInternalServerErrorException("An unexpected error occurred");
        }
    }

}

export default AuthentificationService;
