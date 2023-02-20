import { Nullable } from '../../../libs/nullable';
import BaseRepository from '../../../libs/BaseRepo/BaseRepository';
import {
    IQueryCreate, IQueryDelete, IQueryGet, IQueryList, IQueryUpdate,
} from '../entities';
import IUserModel from './IUserModel';

class UserRepository extends BaseRepository {
    public async create(options: IQueryCreate): Promise<IUserModel> {
        return super.insert('users', options);
    }
    // public async list(options: IQueryList, projection?): Promise<IUserModel[]> {
    //     return super.list({}, projection, options);
    // }

    // public async create(options: IQueryCreate): Promise<IUserModel> {
    //     return super.create(options);
    // }

    // public async get(query: IQueryGet): Promise<Nullable<IUserModel>> {
    //     return super.findOne(query);
    // }

    // public async count(query): Promise<number> {
    //     return super.count(query);
    // }

    // public async findOne(query): Promise<IUserModel> {
    //     return super.findOne(query);
    // }

    // public async update(options, itemsToUpdate: IQueryUpdate): Promise<IUserModel> {
    //     return super.update(options, itemsToUpdate);
    // }

    // public async delete(query: IQueryDelete): Promise<mongoose.UpdateQuery<IUserModel>> {
    //     return super.delete(query);
    // }
}
export default UserRepository;
