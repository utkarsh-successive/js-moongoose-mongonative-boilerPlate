import BaseSchema from '../../../libs/BaseRepo/BaseSchema';

export default class UserSchema extends BaseSchema {
    constructor(options: any) {
        const addressSchema = {
            flat_no: {
                type: Number,
                min: 1,
            },
            city: {
                type: String,
                trim: true,
            },
            state: {
                type: String,
                trim: true,
            },
        };

        const baseSchema = {
            name: {
                type: String,
                trim: true,
            },
            email: {
                type: String,
                trim: true,
            },
            mobile_no: {
                type: String,
                trim: true,
            },
            address: {
                type: addressSchema,
            },
            age: {
                type: Number,
                min: 0,
            },

        };
        super(baseSchema, options);
    }
}
