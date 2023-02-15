import * as mongoose from 'mongoose';
import {
    IQueryBaseUpdate, IQueryUpdate,
    IQueryBaseCreate, IQueryBaseDelete,
} from '../../modules/user/entities';
// import {
//     IQueryBaseCreate,
//     IQueryBaseDelete,
// } from '../../modules/user/entities';

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

    public async count(query:any): Promise < number > {
        return this.ModelType.count(query);
    }

    public async findOne(query : any): Promise < D > {
        return this.ModelType.findOne(query);
    }

    public async update(query: IQueryBaseUpdate, itemsToUpdate: IQueryUpdate): Promise < D > {
        const option = { _id: query };
        const update = { ...itemsToUpdate };
        await this.ModelType.findByIdAndUpdate(option, update);
        const result = await this.ModelType.findById(query);
        return result;
    }

    protected async list(
        query : any = {},
        projection: any = {},
        options : any = {},
    ): Promise<D[]> {
        const option = options;
        option.limit = option.limit || 0;
        option.skip = option.skip || 0;
        return this.ModelType.find(query, projection, option);
    }

    protected async delete(query : IQueryBaseDelete): Promise<mongoose.UpdateQuery<D>> {
        return this.ModelType.deleteOne(query);
    }
}
