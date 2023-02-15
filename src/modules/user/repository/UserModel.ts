// /* eslint-disable no-underscore-dangle */
// import * as mongoose from 'mongoose';
// import IUserModel from './IUserModel';
// import UserSchema from './UserSchema';

// export const UserSchema = new UserSchema({
//     collection: 'User-Management',
//     toJSON: {
//         transform: (doc, ret) => {
//             const res = ret;
//             res.id = res._id;
//             delete res._id;
//             delete res.__v;
//         },
//         virtuals: true,
//     },
// });

// export const todoModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
//     'User-Management',
//     UserSchema,
// );
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
