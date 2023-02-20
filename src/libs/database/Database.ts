import { MongoClient } from 'mongodb';
import { IConfig } from '../../config/IConfig';
import config from '../../config/configuration';

// const { MongoClient } = require('mongodb');
// Connection URI
// Create a new MongoClient
// const client = new MongoClient(configurations.mongo);
// async function connectDatabase() {
//     try {
//     // Connect the client to the server (optional starting in v4.7)
//         await client.connect();
//         // Establish and verify connection
//         await client.db('admin').command({ ping: 1 });
//         console.log('Connected successfully to Database');
//     } catch (error) {
//         // Throw Error when unable to connect to DB
//         throw new Error(`Error while connecting to Database ${error}`);
//     } finally {
//     // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }

// export default connectDatabase;

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
            await this.client.db('admin').command({ ping: 1 });
            console.log('Connected successfully to Database');
        } catch (error) {
            // Throw Error when unable to connect to DB
            throw new Error(`Error while connecting to Database ${error}`);
        } finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }

    public async getDB() {
        return this.client.db(this.dbName);
    }
}

export default Database;
