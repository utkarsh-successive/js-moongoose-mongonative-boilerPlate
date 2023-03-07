
import { ObjectId } from 'mongodb';

export const generateObjectId = (id: any) => ObjectId.isValid(id);
export const isValidObjectId = (id: any) => ObjectId.isValid(id);
export const isNumberValid = (value: number, field: string) => {
    if (typeof (value) === 'number') {
        return true;
    }
    throw new Error(`${field} must be number`);
};