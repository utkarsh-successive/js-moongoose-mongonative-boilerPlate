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
            const { limit, skip, name } = req.query;
            const result = await moduleService.list(
                limit,
                skip,
                name && { name },
            );
            if (!result.length) {
                logger.debug({ message: 'Users not found', data: [] });
                return res.send(SystemResponse.notFoundError('Users not found', []));
            }
            logger.info({ message: 'List of Users', data: [], option: [] });
            return res.send(SystemResponse.success('List of Users ', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public create = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { email } = req.body;
            const totalUsers = await moduleService.count({ email });
            if (totalUsers) {
                logger.error({ message: 'User already exists' });
                return res.send(
                    SystemResponse.badRequestError('User already exists', {}),
                );
            }
            const createOne = await moduleService.create(
                req.body,
            );
            const id = createOne.insertedId;
            const result = await moduleService.get(id);
            logger.info({ messgae: 'User Created Successfully', data: [], option: [] });
            return res.send(SystemResponse.success('User created', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError('Failed', err));
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public bulkInsert = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { users = [] } = req.body;
            const fetchAllEmails = users.map(({ email }) => email);
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
            const result = await moduleService.bulkInsert(users);
            logger.info({ messgae: 'User Created Successfully', data: [], option: [] });
            return res.send(SystemResponse.success('User created', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError('Failed', err));
        }
    };

    // eslint-disable-next-line class-methods-use-this
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
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public update = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            const data = req.body;
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
            const result = await moduleService.update(req.params.id, data);
            logger.info({ messgae: 'Userinfo update successfully', data: result });
            return res.send(
                SystemResponse.success('Userinfo update successfully', result),
            );
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error));
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public bulkUpdate = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { name } = req.query;
            const data = req.body;
            if (data?.email) {
                logger.info({ message: 'Cannot update duplicate email', data: [] });
                return res.send(SystemResponse.notFoundError('Cannot update duplicate emails', []));
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
            return res.send(
                SystemResponse.success('Usersinfo update successfully', result),
            );
        } catch (error) {
            logger.error({ message: error.message, option: [{ Error: error.stack }] });
            return res.send(SystemResponse.internalServerError(error.message, error.errors));
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public delete = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            const totalUser = await moduleService.count({ id });
            if (!totalUser) {
                logger.info({ message: 'User not found', data: [] });
                return res.send(SystemResponse.notFoundError('User not found', []));
            }
            const result = await moduleService.delete(
                req.params,
            );
            logger.info({ messgae: 'User information deleted', data: [], option: [] });
            return res.send(SystemResponse.success('User information deleted', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public bulkDelete = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { name } = req.query;
            const totalUsers = await moduleService.count({ name });
            if (!totalUsers) {
                logger.info({ message: 'Users not found', data: [] });
                return res.send(SystemResponse.notFoundError('Users not found', []));
            }
            const result = await moduleService.bulkDelete(
                { name },
            );
            logger.info({ messgae: 'User deleted', data: [], option: [] });
            return res.send(SystemResponse.success('Users information deleted', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };
}

export default UserController.getInstance();
