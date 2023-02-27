// import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

// export const generateObjectId = () => new mongoose.Types.ObjectId();
// export const isValidObjectId = (id: any) => mongoose.Types.ObjectId.isValid(id);
export const generateObjectId = (id: any) => ObjectId.isValid(id);
export const isValidObjectId = (id: any) => ObjectId.isValid(id);
export const isNumberValid = (value: number, field: string) => {
    if (typeof (value) === 'number') {
        return true;
    }
    throw new Error(`${field} must be number`);
};