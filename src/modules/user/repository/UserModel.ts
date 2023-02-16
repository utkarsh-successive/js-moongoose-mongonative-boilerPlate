/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import UserSchema from './UserSchema';

export const userSchema = new UserSchema({
    collection: 'User-Management',
    toJSON: {
        transform: (doc, ret) => {
            const res = ret;
            res.id = res._id;
            delete res._id;
            delete res.__v;
        },
        virtuals: true,
    },
});

/**
 * @typedef User
 */

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
    'User-Management',
    userSchema,
);
