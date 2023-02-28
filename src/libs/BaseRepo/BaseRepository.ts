import { ObjectId } from 'mongodb';
import { IQueryBaseCreate, IQueryUpdate } from '../../modules/user/entities';
import Database from '../database/Database';

export default class BaseRepository extends Database {
    public static generateObjectId() {
        return new ObjectId();
    }

    public async insert(
        collection: string,
        options: IQueryBaseCreate,
    ): Promise<any> {
        const id = BaseRepository.generateObjectId();
        return (await super.getDB()).collection(collection).insertOne({
            _id: id,
            ...options,
        });
    }

    public async insertMany(
        collection: string,
        options?: any | null,
    ): Promise<any> {
        return (await super.getDB()).collection(collection).insertMany(options);
    }

    public async deleteOne(collection: string, filter: any): Promise<any> {
        return (await super.getDB()).collection(collection).deleteOne(filter);
    }

    public async findOne(collection: string, options?: any): Promise<any> {
        return (await super.getDB()).collection(collection).findOne(options);
    }

    public async count(collection: string, query: any): Promise<number> {
        return (await super.getDB()).collection(collection).count(query);
    }

    public async update(
        collection: string,
        query?: any,
        itemsToUpdate?: IQueryUpdate,
    ): Promise<any> {
        const option = { _id: new ObjectId(query) };
        const update = { ...itemsToUpdate };
        await (await super.getDB())
            .collection(collection)
            .updateOne(option, { $set: { ...update, updatedAt: new Date() } });
        const result = (await super.getDB())
            .collection(collection)
            .findOne(option);
        return result;
    }

    public async bulkUpdate(
        collection: string,
        query: any,
        itemsToUpdate: IQueryUpdate,
    ): Promise<any> {
        const result = (await super.getDB())
            .collection(collection)
            .updateMany(
                { ...query },
                { $set: { ...itemsToUpdate, updatedAt: new Date() } },
            );
        return result;
    }

    public async deleteMany(collection: string, filter: any): Promise<any> {
        return (await super.getDB()).collection(collection).deleteMany(filter);
    }
}
