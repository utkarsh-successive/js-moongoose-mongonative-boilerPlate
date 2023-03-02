import { Document, ObjectId, UpdateResult } from 'mongodb';
import IUser from './IUser';
import UserRepository from './repository/UserRepository';

class UserService {
    private userRepository: UserRepository;

    public constructor() {
        this.userRepository = new UserRepository();
    }

    public async create(options: IUser) {
        return this.userRepository.create(options);
    }

    public async list(limit: number, skip: number, search: any): Promise<IUser[]> {
        return this.userRepository.list(search, { limit, skip });
    }

    public async bulkInsert(options): Promise<IUser[]> {
        return this.userRepository.bulkInsert(options);
    }

    public async get(query): Promise<IUser> {
        const { id } = query;
        return this.userRepository.get({ _id: new ObjectId(id) });
    }

    public async update(option: string, query): Promise<UpdateResult | Document |void> {
        return this.userRepository.update(option, query);
    }

    public async bulkUpdate(query, itemsToUpdate): Promise<UpdateResult | Document> {
        return this.userRepository.bulkUpdate(query, itemsToUpdate);
    }

    public async count(query): Promise<number> {
        return this.userRepository.count(query);
    }

    public async delete(options): Promise<UpdateResult | void> {
        const { id } = options;
        return this.userRepository.delete(
            { _id: new ObjectId(id) },
        );
    }

    public async bulkDelete(options): Promise<UpdateResult | void> {
        return this.userRepository.bulkDelete(
            options,
        );
    }
}

export default UserService;
