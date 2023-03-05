import { Collection, MongoClient } from 'mongodb';
import { IConfig } from '../../config/IConfig';
import { createLogger } from '../logger';
import config from '../../config/configuration';
import loggerConfig from '../../config/LoggerConfig';

const logger = createLogger.createLogInstance(loggerConfig);

class Database {
    private client: MongoClient;

    private dbName: string;

    constructor() {
        const { mongo, databaseName }: IConfig = config;
        this.client = new MongoClient(mongo);
        this.dbName = databaseName;
    }

    public async connect() {
        try {
            // Connect the client to the server (optional starting in v4.7)
            await this.client.connect();
            // Establish and verify connection
            await this.client.db(this.dbName).command({ ping: 1 });
            // eslint-disable-next-line no-console
            logger.info('Connected successfully to Database');
        } catch (error) {
            // Throw Error when unable to connect to DB
            throw new Error(`Error while connecting to Database ${error}`);
        } finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }

    public async close() {
        return this.client.close();
    }

    public async getDB() {
        return this.client.db(this.dbName);
    }

    public async createCollection(collectionName, validationObj): Promise<Collection> {
        return (await this.getDB())
            .createCollection(collectionName, validationObj);
    }
}

export default Database;
