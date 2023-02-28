import { ObjectId } from 'mongodb';
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

    public async bulkInsert(options): Promise<IUser[]> {
        return this.userRepository.bulkInsert(options);
    }

    public async get(query): Promise<IUser> {
        const { id } = query;
        return this.userRepository.get({ _id: new ObjectId(id) });
    }

    public async update(option: string, query): Promise<IUser> {
        return this.userRepository.update(option, query);
    }

    public async bulkUpdate(query, itemsToUpdate): Promise<IUser[]> {
        return this.userRepository.bulkUpdate(query, itemsToUpdate);
    }

    public async count(query): Promise<number> {
        return this.userRepository.count(query);
    }

    public async delete(options): Promise<any> {
        const { id } = options;
        return this.userRepository.delete(
            { _id: new ObjectId(id) },
        );
    }

    public async bulkDelete(options): Promise<any> {
        const { name } = options;
        return this.userRepository.bulkDelete(
            { first_name: name },
        );
    }
}

export default UserService;
