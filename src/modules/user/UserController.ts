/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { performance } from 'perf_hooks';
import { SystemResponse } from '../../libs/response-handler';
import IUser from './IUser';
import { Nullable } from '../../libs/nullable';
import script from '../../script/index';
import addLogReport from '../../report/index';
import configurations from '../../config/configuration';

class UserController {
    private static instance;

    public static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }

        return UserController.instance;
    }

    public create = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            // const { email } = req.body;
            const user = script.generateUserData(1);
            const { email } = user[0];
            const startTime = performance.now();
            const totalUsers = await moduleService.count({ email });
            if (totalUsers) {
                logger.error({ message: 'User already exists' });
                return res.send(
                    SystemResponse.badRequestError('User already exists', {}),
                );
            }
            const result = await moduleService.create(
                user[0],
            );
            const endTime = performance.now() - startTime;
            addLogReport('insertOne', endTime, 1);
            logger.info({ message: 'User added successfully', data: result });
            return res.send(
                SystemResponse.success('User added successfully', result),
            );
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };

    public bulkInsert = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const user = script.generateUserData(500);
            const startTime = performance.now();
            const fetchAllEmails = user.map(({ email }) => email);
            if (fetchAllEmails.length !== [...new Set(fetchAllEmails)].length) {
                logger.error({ message: 'Duplicate User' });
                return res.send(
                    SystemResponse.badRequestError('Duplicate User', {}),
                );
            }
            const totalUsers = await moduleService.count(
                { email: { $in: [...new Set(fetchAllEmails)] } },
            );
            if (totalUsers) {
                logger.error({ message: 'User already exists' });
                return res.send(
                    SystemResponse.badRequestError('User already exists', {}),
                );
            }
            const result = await moduleService.bulkInsert(user);
            const endTime = performance.now() - startTime;
            addLogReport('insertMany', endTime, 500);
            const dataId = { insertedIds: result.map((item) => item._id) };
            if (configurations.autoTest) {
                script.storeId(dataId.insertedIds, 'user');
            }
            logger.info({ message: 'Users added successfully', data: result });
            return res.send(
                SystemResponse.success('Users added successfully', result),
            );
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };

    public list = async (req, res): Promise<IUser[]> => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { limit = 10, skip = 0, name } = req.query;
            const startTime = performance.now();
            const result = await moduleService.list(
                limit,
                skip,
                name && { name },
            );
            if (!result.length) {
                logger.debug({ message: 'Users not found', data: [] });
                return res.send(SystemResponse.notFoundError('Users not found', []));
            }
            const endTime = performance.now() - startTime;
            addLogReport('findMany', endTime, result.length);
            logger.info({ message: 'List of users', data: result });
            return res.send(SystemResponse.success('List of users', result));
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };

    public get = async (req, res): Promise<Nullable<IUser>> => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            const startTime = performance.now();
            const userInfo = await moduleService.get({
                id,
            });
            if (!userInfo || !Object.keys(userInfo)?.length) {
                logger.info({ message: 'User not found', data: {} });
                return res.send(SystemResponse.notFoundError('User not found', {}));
            }
            logger.info({ message: 'Fetch user successfully', data: userInfo });
            const endTime = performance.now() - startTime;
            addLogReport('findOne', endTime, 1);
            return res.send(SystemResponse.success('Fetch user successfully', userInfo));
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };

    public update = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            const data = req.body;
            // let ids;
            // const data = { age: 51 };
            // if (configurations.autoTest) {
            //     ids = script.readIds('user', 1);
            // }
            // // eslint-disable-next-line prefer-destructuring
            // const id = ids[0];
            const startTime = performance.now();
            if (data?.email) {
                const { email } = data;
                const totalUsers = await moduleService.count({ email });
                if (totalUsers) {
                    logger.error({ message: 'User already exists' });
                    return res.send(
                        SystemResponse.badRequestError('User already exists', {}),
                    );
                }
            }
            const user = await moduleService.count({
                id,
            });
            if (!user) {
                logger.info({ message: 'User not found', data: {} });
                return res.send(SystemResponse.notFoundError('User not found', {}));
            }
            const result = await moduleService.update(id, data);
            logger.info({ messgae: 'Userinfo update successfully', data: result });
            const endTime = performance.now() - startTime;
            addLogReport('updateOne', endTime, 1);
            return res.send(
                SystemResponse.success('Userinfo update successfully', result),
            );
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };

    public bulkUpdate = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { name } = req.query;
            const data = req.body;
            // const name = 'deepak';
            // const data = { age: 99 };
            const startTime = performance.now();
            if (data?.email) {
                logger.info({ message: 'Cannot update duplicate email', data: [] });
                return res.send(SystemResponse
                    .notFoundError('Cannot update duplicate emails', []));
            }
            const totalUsers = await moduleService.count({ name });
            if (!totalUsers) {
                logger.info({ message: 'User not found', data: [] });
                return res.send(SystemResponse.notFoundError('Users not found', []));
            }
            const result = await moduleService.bulkUpdate(
                { name },
                data,
            );
            logger.info({ messgae: 'Usersinfo update successfully', data: result });
            const endTime = performance.now() - startTime;
            addLogReport('updateMany', endTime, totalUsers);
            return res.send(
                SystemResponse.success('Usersinfo update successfully', result),
            );
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error.errors));
        }
    };

    public delete = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            // let ids;
            // if (configurations.autoTest) {
            //     ids = script.readIds('user', 1);
            // }
            // // eslint-disable-next-line prefer-destructuring
            // const id = ids[0];
            const startTime = performance.now();
            const totalUser = await moduleService.count({ id });
            if (!totalUser) {
                logger.info({ message: 'User not found', data: [] });
                return res.send(SystemResponse.notFoundError('User not found', []));
            }
            const result = await moduleService.delete({
                id,
            });
            logger.info({ message: 'User information deleted' });
            const endTime = performance.now() - startTime;
            addLogReport('deleteOne', endTime, 1);
            return res.send(SystemResponse.success('User information deleted', result));
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };

    public bulkDelete = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { name } = req.query;
            // const name = 'deepak';
            const startTime = performance.now();
            const totalUsers = await moduleService.count({ name });
            if (!totalUsers) {
                logger.info({ message: 'Users not found', data: [] });
                return res.send(SystemResponse.notFoundError('Users not found', []));
            }
            const result = await moduleService.bulkDelete({ name });
            logger.info({ message: 'Users information deleted' });
            const endTime = performance.now() - startTime;
            addLogReport('deleteMany', endTime, totalUsers);
            return res.send(SystemResponse.success('Users information deleted', result));
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };
}

export default UserController.getInstance();
