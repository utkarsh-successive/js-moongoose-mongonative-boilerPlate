import { Db, DeleteResult, ObjectId } from 'mongodb';
import {
    IQueryBaseCreate, IQueryBaseDelete,IQueryBaseUpdate, IQueryUpdate,
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
    public async count(collection: string, query:any): Promise < number > {
        return (await super.getDB()).collection(collection).count(query)
    }
    // public async findOne(query : any): Promise < any > {
    //     return this.ModelType.find({ _id: query.id, deletedAt: { $exists: false } });
    // }
    public async update(collection: string, query?:any, itemsToUpdate?:IQueryUpdate): Promise < any > {
        const option = { _id: new ObjectId(query) };
        const update = { ...itemsToUpdate };
        await (await super.getDB()).collection(collection).updateOne(option,  { $set: { ...update, updatedAt: new Date() } });
        const result =  (await super.getDB()).collection(collection).findOne(option);
        return result;
    }
    public async bulkUpdate(
        collection: string,
        query: any,
        itemsToUpdate: IQueryUpdate,
    ): Promise<any> {
        console.log('under the base re[ository');
        console.log('under the base re[ository query', query);
        console.log('under the base re[ository', itemsToUpdate);
        const result = (await super.getDB()).collection(collection).updateMany(
                {  ...query },
                {$set: { ...itemsToUpdate, updatedAt: new Date() }},
            )
        console.log('result', result);
        return result;
    }

    // protected async list(
    //     query : any = {},
    //     options : any = {},
    //     projection: any = {},
    // ): Promise<[]> {
    //     const option = options;
    //     option.limit = options.limit;
    //     option.skip = options.skip;
    //     return this.ModelType.find(
    //         { deletedAt: { $exists: false }, ...query },
    //         projection,
    //         option,
    //     ).lean();
    // }
}
