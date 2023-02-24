import { Nullable } from '../../../libs/nullable';
import BaseRepository from '../../../libs/BaseRepo/BaseRepository';
import {
    IQueryCreate, IQueryDelete, IQueryGet, IQueryList, IQueryUpdate,
} from '../entities';
import IUserModel from './IUserModel';
import { DeleteResult } from 'mongodb';

class UserRepository extends BaseRepository {
    public async create(options: IQueryCreate): Promise<IUserModel> {
        return super.insert('users', options);
    }
    public async bulkInsert(options: IQueryCreate): Promise<IUserModel[]> {
        return super.insertMany('users', options);
    }

    public async delete(options: IQueryDelete): Promise<DeleteResult | void> {
        return super.deleteOne('users', options);
    }
    // public async list(options: IQueryList, projection?): Promise<IUserModel[]> {
    //     return super.list({}, projection, options);
    // }

    // public async create(options: IQueryCreate): Promise<IUserModel> {
    //     return super.create(options);
    // }

    public async get(query: IQueryGet): Promise<IUserModel> {
        return super.findOne('users', query);
    }

    // public async count(query): Promise<number> {
    //     return super.count(query);
    // }

    // public async update(options, itemsToUpdate: IQueryUpdate): Promise<IUserModel> {
    //     return super.update(options, itemsToUpdate);
    // }

}
export default UserRepository;
