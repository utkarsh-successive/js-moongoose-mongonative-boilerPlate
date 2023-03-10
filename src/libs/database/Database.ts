import * as mongoose from 'mongoose';
import configurations from '../../config/configuration';

export interface IDatabaseConfig {
  mongoUri: string;
}

export default class Database {
    public static open(mongoUri) {
        return new Promise((resolve, reject) => {
            const options = {
                autoIndex: true,
            };
            let connectionString = null;
            if (mongoUri) {
                connectionString = mongoUri;
            } else {
                connectionString = configurations.mongo;
            }
            mongoose.connect(connectionString, options, async (err) => {
                if (err) {
                    reject(err);
                }
                resolve('Successfully connected to database');
            });
            mongoose.connection.on('error', () => {
                throw new Error(`unable to connect to database: ${connectionString}`);
            });
        });
    }

    public static close() {
        mongoose.disconnect();
    }
}
