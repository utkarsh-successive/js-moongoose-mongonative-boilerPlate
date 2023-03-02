import { UpdateResult, ObjectId, Document } from 'mongodb';
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
        const result = (await super.getDB()).collection(collection).insertOne({
            _id: id,
            ...options,
        });
        return result;
    }

    protected async list(
        collection: string,
        query : any = {},
        options : any = {},
    ): Promise<any> {
        const option = options;
        option.limit = options.limit;
        option.skip = options.skip;
        return (await super.getDB()).collection(collection)
            .find({ ...query, deletedAt: { $exists: false } }, option).toArray();
    }

    public async insertMany(
        collection: string,
        options?: any | null,
    ): Promise<any> {
        return (await super.getDB()).collection(collection).insertMany(options);
    }

    public async deleteOne(collection: string, filter: any): Promise<UpdateResult | void> {
        const deleteData = (await super.getDB())
            .collection(collection)
            .updateOne(filter, { $set: { deletedAt: new Date() } });
        return deleteData;
    }

    public async findOne(collection: string, options?: any): Promise<any> {
        return (await super.getDB())
            .collection(collection)
            .findOne({ ...options, deletedAt: { $exists: false } });
    }

    public async count(collection: string, query: any): Promise<number> {
        const option = query.email || query.name ? query : { _id: new ObjectId(query) };
        return (await super.getDB()).collection(collection)
            .count({ ...option, deletedAt: { $exists: false } });
    }

    public async update(
        collection: string,
        query?: any,
        itemsToUpdate?: IQueryUpdate,
    ): Promise<UpdateResult | Document | void> {
        const option = { _id: new ObjectId(query) };
        const update = { ...itemsToUpdate };
        await (await super.getDB())
            .collection(collection)
            .updateOne(
                { ...option, deletedAt: { $exists: false } },
                { $set: { ...update, updatedAt: new Date() } },
            );
        const result = (await super.getDB())
            .collection(collection)
            .findOne(option);
        return result;
    }

    public async bulkUpdate(
        collection: string,
        query: any,
        itemsToUpdate: IQueryUpdate,
    ): Promise<UpdateResult | Document > {
        const result = (await super.getDB())
            .collection(collection)
            .updateMany(
                { ...query, deletedAt: { $exists: false } },
                { $set: { ...itemsToUpdate, updatedAt: new Date() } },
            );
        return result;
    }

    public async deleteMany(collection: string, filter: any): Promise<UpdateResult | any> {
        return (await super.getDB())
            .collection(collection)
            .updateMany(
                { ...filter, deletedAt: { $exists: false } },
                { $set: { deletedAt: new Date() } },
            );
    }
}
