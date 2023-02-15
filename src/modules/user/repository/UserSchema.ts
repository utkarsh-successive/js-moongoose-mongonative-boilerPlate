import BaseSchema from '../../../libs/BaseRepo/BaseSchema';

export default class UserSchema extends BaseSchema {
    constructor(options: any) {
        const baseSchema = {
            name: {
                type: String,
            },
            empId: {
                type: String,
            },
            email: {
                type: String,
            },
            mobile_no: {
                type: String,
            },
            address: {
                type: Object,
            },
            age: {
                type: Number,
            },

        };
        super(baseSchema, options);
    }
}
