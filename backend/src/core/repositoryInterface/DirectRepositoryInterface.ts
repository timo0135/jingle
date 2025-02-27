import Direct from "../domain/entities/direct/Direct";

interface DirectRepositoryInterface {
    save(direct: Direct): Promise<string>;
    delete(id: string): Promise<void>;
    find(id: string): Promise<Direct>;
    findAll(): Promise<Direct[]>;
    findByUserId(userId: string): Promise<Direct[]>;
    findNow(): Promise<Direct[]>;
}

export default DirectRepositoryInterface;
