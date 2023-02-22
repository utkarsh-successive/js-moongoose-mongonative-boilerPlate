import BaseSchema from '../../../libs/BaseRepo/BaseSchema';

export default class UserSchema extends BaseSchema {
    constructor(options: any) {
        const addressSchema = {
            flat_no: {
                type: Number,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
        };

        const baseSchema = {
            name: {
                type: String,
            },
            email: {
                type: String,
                unique: true,
            },
            mobile_no: {
                type: String,
            },
            address: {
                type: addressSchema,
            },
            age: {
                type: Number,
            },

        };
        super(baseSchema, options);
    }
}
