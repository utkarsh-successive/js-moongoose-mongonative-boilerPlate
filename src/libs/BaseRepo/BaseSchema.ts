import * as mongoose from 'mongoose';

class VersionableSchema extends mongoose.Schema {
    constructor(options: any, collections: any) {
        const versionedOptions = {
            createdAt: {
                default: Date.now,
                type: Date,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            ...options,
        };
        super(versionedOptions, collections);
    }
}

export default VersionableSchema;
