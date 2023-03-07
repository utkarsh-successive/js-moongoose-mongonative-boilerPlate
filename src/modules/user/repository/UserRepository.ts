import { Document, UpdateResult } from 'mongodb';
import collectionNames from '../../../libs/constants';
import BaseRepository from '../../../libs/BaseRepo/BaseRepository';
import {
    IQueryCreate, IQueryDelete, IQueryGet, IQueryList, IQueryUpdate,
} from '../entities';
import IUserModel from './IUserModel';

class UserRepository extends BaseRepository {
    private collectionName: string;

    constructor() {
        super();
        this.collectionName = collectionNames.USERS_COLLECTION;
    }

    public async create(options: IQueryCreate): Promise<IUserModel> {
        return super.insert(this.collectionName, options);
    }

    public async list(search, options: IQueryList): Promise<IUserModel[]> {
        return super.list(this.collectionName, search, options);
    }

    public async bulkInsert(options: IQueryCreate): Promise<IUserModel[]> {
        return super.insertMany(this.collectionName, options);
    }

    public async delete(options: IQueryDelete): Promise<UpdateResult | void> {
        return super.deleteOne(this.collectionName, options);
    }

    public async get(query: IQueryGet): Promise<IUserModel> {
        return super.findOne(this.collectionName, query);
    }

    public async update(options, itemsToUpdate: IQueryUpdate)
    : Promise<UpdateResult | Document |void> {
        return super.update(this.collectionName, options, itemsToUpdate);
    }

    public async bulkUpdate(
        query,
        itemsToUpdate: IQueryUpdate,
    ): Promise<UpdateResult | Document> {
        return super.bulkUpdate(this.collectionName, query, itemsToUpdate);
    }

    public async count(query): Promise<number> {
        return super.count(this.collectionName, query);
    }

    public async bulkDelete(options: any): Promise<UpdateResult | void> {
        return super.deleteMany(this.collectionName, options);
    }
}
export default UserRepository;
