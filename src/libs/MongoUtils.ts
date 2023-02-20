import * as mongoose from 'mongoose';

export const generateObjectId = () => new mongoose.Types.ObjectId();
export const isValidObjectId = (id: any) => mongoose.Types.ObjectId.isValid(id);
