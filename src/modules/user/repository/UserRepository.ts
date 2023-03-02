import { Document, UpdateResult } from 'mongodb';
import BaseRepository from '../../../libs/BaseRepo/BaseRepository';
import {
    IQueryCreate, IQueryDelete, IQueryGet, IQueryList, IQueryUpdate,
} from '../entities';
import IUserModel from './IUserModel';

class UserRepository extends BaseRepository {
    public async create(options: IQueryCreate): Promise<IUserModel> {
        return super.insert('users', options);
    }

    public async list(search, options: IQueryList): Promise<IUserModel[]> {
        return super.list('users', search, options);
    }

    public async bulkInsert(options: IQueryCreate): Promise<IUserModel[]> {
        return super.insertMany('users', options);
    }

    public async delete(options: IQueryDelete): Promise<UpdateResult | void> {
        return super.deleteOne('users', options);
    }

    public async get(query: IQueryGet): Promise<IUserModel> {
        return super.findOne('users', query);
    }

    public async update(options, itemsToUpdate: IQueryUpdate)
    : Promise<UpdateResult | Document |void> {
        return super.update('users', options, itemsToUpdate);
    }

    public async bulkUpdate(
        query,
        itemsToUpdate: IQueryUpdate,
    ): Promise<UpdateResult | Document> {
        return super.bulkUpdate('users', query, itemsToUpdate);
    }

    public async count(query): Promise<number> {
        return super.count('users', query);
    }

    public async bulkDelete(options: any): Promise<UpdateResult | void> {
        return super.deleteMany('users', options);
    }
}
export default UserRepository;
