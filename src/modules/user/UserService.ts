import * as mongoose from 'mongoose';
import IUser from './IUser';
import UserRepository from './repository/UserRepository';

class UserService {
    private userRepository: UserRepository;

    public constructor() {
        this.userRepository = new UserRepository();
    }

    public async list(limit: number, skip: number, search: any, projection?): Promise<IUser[]> {
        return this.userRepository.list(search, projection, {limit, skip});
    }

    public async create(query): Promise<IUser> {
        return this.userRepository.create(query);
    }

    public async bulkInsert(query): Promise<IUser[]> {
        return this.userRepository.bulkInsert(query);
    }

    public async get(query): Promise<IUser> {
        return this.userRepository.get(query);
    }
    
    public async update(option: string, query): Promise<IUser> {
        return this.userRepository.update(option, query);
    }

    public async delete(query): Promise<mongoose.UpdateQuery<IUser>> {
        const { id } = query;
        return this.userRepository.delete({
            _id: id,
        });
    }
    public async bulkDelete(query): Promise<mongoose.UpdateQuery<IUser>> {
        return this.userRepository.bulkDelete({
            ...query,
        });
    }
}

export default UserService;
