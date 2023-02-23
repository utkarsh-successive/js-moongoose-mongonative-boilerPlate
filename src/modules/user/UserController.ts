/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { SystemResponse } from '../../libs/response-handler';
import IUser from './IUser';
import { Nullable } from '../../libs/nullable';

class UserController {
    private static instance;

    public static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }

        return UserController.instance;
    }

    // eslint-disable-next-line class-methods-use-this
    public list = async (req, res): Promise<IUser[]> => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { limit, skip } = req.query;
            const { searchOptions } = req.body;
            const result = await moduleService.list(
                limit,
                skip,
                searchOptions,
            );
            if (!result.length) {
                logger.debug({ message: 'Users not found', data: [] });
                return res.send(SystemResponse.notFoundError('Users not found', []));
            }
            logger.info({ message: 'List of users', data: result });
            return res.send(SystemResponse.success('List of users', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError(err._message, err.errors));
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public create = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const result = await moduleService.create(
                req.body,
            );
            logger.info({ message: 'User added successfully', data: result });
            return res.send(
                SystemResponse.success('User added successfully', result),
            );
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError(err._message, err.errors));
        }
    };

    public bulkInsert = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { users } = req.body;
            const result = await moduleService.bulkInsert(users);
            logger.info({ message: 'Users added successfully', data: result });
            return res.send(
                SystemResponse.success('Users added successfully', result),
            );
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError(err._message, err.errors));
        }
    };

    public get = async (req, res): Promise<Nullable<IUser>> => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            const userInfo = await moduleService.get({
                id,
            });
            if (!userInfo || !Object.keys(userInfo)?.length) {
                logger.info({ message: 'User not found', data: {} });
                return res.send(SystemResponse.notFoundError('User not found', {}));
            }
            logger.info({ message: 'Fetch user successfully', data: userInfo });
            return res.send(SystemResponse.success('Fetch user successfully', userInfo));
        } catch (err) {
            logger.error({ message: err._message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError(err._message, err.errors));
        }
    };

    public update = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            const data = req.body;
            const user = await moduleService.count({
                id,
            });
            if (!user) {
                logger.info({ message: 'User not found', data: {} });
                return res.send(SystemResponse.notFoundError('User not found', {}));
            }
            const result = await moduleService.update(req.params.id, data);
            logger.info({ messgae: 'Userinfo update successfully', data: result });
            return res.send(
                SystemResponse.success('Userinfo update successfully', result),
            );
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError(err._message, err.errors));
        }
    };

    public bulkUpdate = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { name } = req.query;
            const totalUsers = await moduleService.count({ name });
            if (!totalUsers) {
                logger.info({ message: 'User not found', data: [] });
                return res.send(SystemResponse.notFoundError('Users not found', []));
            }
            const result = await moduleService.bulkUpdate(
                { name },
                { $inc: { age: 10 } },
            );
            logger.info({ messgae: 'Userinfo update successfully', data: result });
            return res.send(
                SystemResponse.success('Userinfo update successfully', result),
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
            const result = await moduleService.delete({
                id,
            });
            logger.info({ message: 'User information deleted' });
            return res.send(SystemResponse.success('User information deleted', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError(err._message, err.errors));
        }
    };

    public bulkDelete = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { name } = req.query;
            const result = await moduleService.bulkDelete(name);
            logger.info({ message: 'User information deleted' });
            return res.send(SystemResponse.success('User information deleted', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError(err._message, err.errors));
        }
    };
}

export default UserController.getInstance();
