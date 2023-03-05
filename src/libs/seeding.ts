import config from '../config/configuration';
import BaseRepository from './BaseRepo/BaseRepository';
import createLogger from './logger/createLogger';
import loggerConfig from '../config/LoggerConfig';
import validation from './validations';
import Indexes from './Indexes';
import collectionNames from './constants';

const logger = createLogger.createLogInstance(loggerConfig);
const seedSchemaValidation = async () => {
    try {
        const { isSeedingSchemaValidationActive = '' } = config;
        if (isSeedingSchemaValidationActive.toLowerCase() === 'true') {
            logger.info({ message: '::::::::::::::::: SEEDING START :::::::::::::::::' });
            const baseRepo = new BaseRepository();
            const db = await baseRepo.getDB();
            const collections = await db.listCollections().toArray();
            const alreadyExistsCollectionNames = collections.map(({ name }) => name);

            // check if new Collection added or not
            const newCollection = [];
            const newCollectionNames = [];
            Object.values(collectionNames).forEach((colName) => {
                const isCollectionExist = collections.findIndex(({ name }) => name === colName);
                if (isCollectionExist === -1) {
                    const schemaValidation = validation[colName] || {};
                    newCollectionNames.push(colName);
                    newCollection.push({ name: colName, schemaValidation });
                }
            });
            logger.info({ message: 'Already exists collections', alreadyExistsCollectionNames });

            logger.info({ message: 'New Collections', newCollectionNames });

            // NOTE: create new collection and it's validation

            logger.info({ message: 'New Collection Adding START' });
            if (newCollection.length) {
                const newCollectionPromise = newCollection.map(async (collection) => {
                    const { name: collectionName, schemaValidation } = collection;
                    return db.createCollection(
                        collectionName,
                        schemaValidation,
                    );
                });
                await Promise.all(newCollectionPromise);
            }
            logger.info({ message: 'New Collection Adding End' });
            // NOTE: Update already exists collection validations

            logger.info({ message: 'Update Collection START' });
            if (collections.length) {
                const alreadyExistsPromise = collections.map(async (collection) => {
                    const { name: collectionName = '' } = collection;
                    const validator = validation[collectionName];
                    return db.command({
                        collMod: collectionName,
                        ...validator,
                    });
                });
                await Promise.all(alreadyExistsPromise);
            }
            logger.info({ message: 'Update Collection End' });

            logger.info(':::::::::::::; SEEDING END ::::::::::::::::::');
        }
    } catch (error) {
        logger.error({ message: error.message, error });
        throw new Error('Error While Seeding Collection and it\'s Validations');
    }
};

const seedIndexes = async () => {
    try {
        const { isSeedingIndexes = '' } = config;
        if (isSeedingIndexes === 'true') {
            logger.info({ message: 'Creating Indexes START' });
            const baseRepo = new BaseRepository();
            const db = await baseRepo.getDB();
            const collections = await db.listCollections().toArray();
            const indexPromise = collections.map(async (collection) => {
                const { name } = collection;
                const collectionInfo = db.collection(name);
                const existingIndexes = await collectionInfo.listIndexes().toArray();
                logger.info({ message: `Existing indexes into collection: ${name}`, existingIndexes });
                const indexesToCreate = Indexes[name] ?? [];
                const filterIndexToCreate = indexesToCreate.filter((index) => {
                    const indexName = index?.name ?? Object.entries(index.key || {}).flat().join('_');
                    const isIndexPresent = existingIndexes.find(
                        (existIndex) => existIndex.name === indexName,
                    );
                    return !isIndexPresent;
                });
                if (filterIndexToCreate.length) {
                    logger.info({ message: `Create new indexes into collection: ${name}`, filterIndexToCreate });
                }
                return filterIndexToCreate.length
                        && collectionInfo.createIndexes(filterIndexToCreate);
            });
            await Promise.all(indexPromise);
            logger.info({ message: 'Creating Index END' });
        }
    } catch (error) {
        logger.error({ message: error.message, error });
        throw new Error('Error While Seeding indexes');
    }
};

export default async () => {
    await seedSchemaValidation();
    await seedIndexes();
};
