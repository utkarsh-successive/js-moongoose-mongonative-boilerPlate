import BaseSchema from '../../../libs/BaseRepo/BaseSchema';

export default class UserSchema extends BaseSchema {
    constructor(options: any) {
        const baseSchema = {
            first_name: {
                type: String,
            },
            last_name: {
                type: String,
            },
            email: {
                type: String,
            },
            password: {
                type: String,
            },
        };
        super(baseSchema, options);
    }
}
