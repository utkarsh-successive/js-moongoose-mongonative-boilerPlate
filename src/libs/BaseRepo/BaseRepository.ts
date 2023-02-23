import { ObjectId } from 'mongodb';
import {
    IQueryBaseCreate,
} from '../../modules/user/entities';
import Database from '../database/Database';

export default class BaseRepository extends Database {
    public static generateObjectId() {
        return new ObjectId();
    }

    public async insert(collection: string, options : IQueryBaseCreate): Promise < any > {
        const id = BaseRepository.generateObjectId();
        return (await super.getDB()).collection(collection).insertOne({
            _id: id,
            ...options,
        });
    }
    public async createCollection(collection: string): Promise < any > {
        return (await super.getDB()).createCollection(collection, {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['first_name', 'last_name', 'email', 'password'],
                    properties: {
                      first_name: {
                        bsonType: 'string',
                        minLength: 3,
                        maxLength: 50
                      },
                      last_name: {
                        bsonType: 'string',
                        minLength: 3,
                        maxLength: 50
                      },
                      
                      password: {
                        bsonType: 'string',
                        minimum: 8,
                        maximum: 15
                      },
                      email: {
                        bsonType: 'string',
                        pattern: /^\S+@\S+\.\S+$/
                      }
                    }
                  }
            }
         } )
        // const id = BaseRepository.generateObjectId();
        // return (await super.getDB()).collection(collection).insertOne({
        //     _id: id,
        //     ...options,
        // });
    }
}
