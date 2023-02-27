import { DeleteResult } from 'mongodb';
import BaseRepository from '../../../libs/BaseRepo/BaseRepository';
import {
    IQueryCreate,
    IQueryDelete,
    IQueryGet,
    IQueryUpdate,
} from '../entities';
import IUserModel from './IUserModel';

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

    public async get(query: IQueryGet): Promise<IUserModel> {
        return super.findOne('users', query);
    }

    public async update(
        options,
        itemsToUpdate: IQueryUpdate,
    ): Promise<IUserModel> {
        return super.update('users', options, itemsToUpdate);
    }

    public async bulkUpdate(
        query,
        itemsToUpdate: IQueryUpdate,
    ): Promise<IUserModel[]> {
        return super.bulkUpdate('users', query, itemsToUpdate);
    }

    public async count(query): Promise<number> {
        return super.count('users', query);
    }

    public async bulkDelete(options: any): Promise<DeleteResult | void> {
        return super.deleteMany('users', options);
    }
}
export default UserRepository;
