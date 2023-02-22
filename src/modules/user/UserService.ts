import { ObjectId } from "mongodb";
import IUser from "./IUser";
import UserRepository from "./repository/UserRepository";

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
        const {id} = query
        return this.userRepository.get({ _id: new ObjectId(id)});
    }
    // public async list(limit: number, skip: number, projection?): Promise<IUser[]> {
    //     return this.userRepository.list({ limit, skip }, projection);
    // }

    // public async create(query): Promise<IUser> {
    //     return this.userRepository.create(query);
    // }

    // public async get(query): Promise<IUser> {
    //     const { id } = query;
    //     return this.userRepository.get({ id });
    // }

    // public async update(option: string, query): Promise<IUser> {
    //     return this.userRepository.update(option, query);
    // }

    public async delete(options): Promise<any> {
        const { id } = options;
        return this.userRepository.delete(
           { _id: new ObjectId(id)}
        );
    }
}

export default UserService;
