import { Db, DeleteResult, ObjectId } from 'mongodb';
import {
    IQueryBaseCreate, IQueryBaseDelete,
} from '../../modules/user/entities';
import Database from '../database/Database';

export default class BaseRepository extends Database {
    public static generateObjectId() {
        return new ObjectId();
    }
    public async insert(collection: string, options : IQueryBaseCreate): Promise < any > {
        const id = BaseRepository.generateObjectId();
        return (await super.getDB()).collection(collection).insertOne({
            _id: id,
            ...options,
        });
    }
    public async insertMany(collection: string, options?: any | null,): Promise < any > {
        return (await super.getDB()).collection(collection).insertMany(options);
    }

    public async deleteOne(collection: string, filter: any): Promise<any> {
        return (await super.getDB()).collection(collection).deleteOne(filter);
    }

    public async findOne(collection: string, options?:any): Promise<any> {
        return (await super.getDB()).collection(collection).findOne(options)
    }
}
