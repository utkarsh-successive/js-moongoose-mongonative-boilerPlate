import { ObjectId } from 'mongodb';
import {
    IQueryBaseCreate,
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
}
