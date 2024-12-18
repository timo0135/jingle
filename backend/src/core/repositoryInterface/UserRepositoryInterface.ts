import User from "../domain/entities/user/User";

interface UserRepositoryInterface {
    save(user: User): Promise<string>;
    delete(id: string): Promise<void>;
    find(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    getByEmail(email: string): Promise<User>;
    getByPseudo(pseudo: string): Promise<User>;
    getsByRole(role: string): Promise<User[]>;
}

export default UserRepositoryInterface;
