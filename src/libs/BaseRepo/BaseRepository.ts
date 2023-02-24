import * as mongoose from 'mongoose';
import {
    IQueryBaseUpdate, IQueryUpdate,
    IQueryBaseCreate, IQueryBaseDelete, IQueryBaseDeleteMany,
} from '../../modules/user/entities';

export default class BaseRepository <
D extends mongoose.Document, M extends mongoose.Model<D>
> {
    public static generateObjectId() {
        return String(new mongoose.Types.ObjectId());
    }

    private ModelType: M;

    constructor(modelType) {
        this.ModelType = modelType;
    }

    public async create(options : IQueryBaseCreate): Promise < D > {
        const id = BaseRepository.generateObjectId();
        const model = new this.ModelType(
            {
                ...options,
                _id: id,
            },
        );
        return model.save();
    }

    public async insertMany(
        options?: any | null,
    ): Promise<D[]> {
        const result = this.ModelType.insertMany(options);
        return result;
    }

    public async count(query:any): Promise < number > {
        return this.ModelType.count({ deletedAt: { $exists: false }, ...query });
    }

    public async findOne(query : any): Promise < any > {
        return this.ModelType.find({ _id: query.id, deletedAt: { $exists: false } });
    }

    public async update(query: IQueryBaseUpdate, itemsToUpdate: IQueryUpdate): Promise < any > {
        const option = { _id: query, deletedAt: { $exists: false } };
        const update = { ...itemsToUpdate };
        await this.ModelType
            .updateOne(option, { ...update, updatedAt: new Date() })
            .lean();
        const result = await this.ModelType.findById(query);
        return result;
    }

    public async bulkUpdate(
        query: IQueryBaseDeleteMany,
        itemsToUpdate: IQueryUpdate,
    ): Promise<mongoose.UpdateQuery<D[]>> {
        const result = await this.ModelType
            .updateMany(
                { deletedAt: { $exists: false }, ...query },
                { ...itemsToUpdate, updatedAt: new Date() },
            )
            .lean();
        return result;
    }

    protected async list(
        query : any = {},
        options : any = {},
        projection: any = {},
    ): Promise<D[]> {
        const option = options;
        option.limit = options.limit;
        option.skip = options.skip;
        return this.ModelType.find(
            { deletedAt: { $exists: false }, ...query },
            projection,
            option,
        ).lean();
    }

    protected async delete(query : IQueryBaseDelete): Promise<mongoose.UpdateQuery<D>> {
        return this.ModelType
            .updateOne(
                { deletedAt: { $exists: false }, ...query },
                { deletedAt: new Date() },
            ).lean();
    }

    protected async deleteMany(query : IQueryBaseDeleteMany): Promise<mongoose.UpdateQuery<D>> {
        return this.ModelType
            .updateMany(
                { deletedAt: { $exists: false }, ...query },
                { deletedAt: new Date() },
            ).lean();
    }
}
