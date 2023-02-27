import * as bcrypt from 'bcrypt';
import { SystemResponse } from '../../libs/response-handler';
import IUser from './IUser';
import { Nullable } from '../../libs/nullable';
import CacheManager from '../../libs/cache/CacheManager';
import patternMatecherhelper from './helper/PatternMatecherHelper';
import * as constants from '../../config/constants';
import { Services } from '../../services/constants';
import { NotificationService } from '../../config/constants';

class UserController {
    private static instance;

    public static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }

        return UserController.instance;
    }

    // eslint-disable-next-line class-methods-use-this
    public list = async (req, res, next): Promise<IUser[]> => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { limit, skip } = req.query;
            const result = await moduleService.list(limit, skip);
            if (!result.length) {
                logger.debug({ message: 'Data not found', option: [], data: [] });

                return next(SystemResponse.badRequestError('Data not found', ''));
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
            const result = await moduleService.create(
                req.body,
            );
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
            // const {
            //     email, password, first_name: firstName, last_name: lastName,
            // } = req.body;
            // const hashPassword = await bcrypt.hash(password, constants.BCRYPT_SALT_ROUNDS);
            const result = await moduleService.bulkInsert(req.body);
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
            const result = await moduleService.get({ id });
            logger.info({ messgae: 'User found', data: [] });
            return res.send(SystemResponse.success('User found', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
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
            const result = await moduleService.delete(
                req.params,
            );
            logger.info({ messgae: 'User deleted', data: [], option: [] });
            return res.send(SystemResponse.success('User deleted', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public bulkDelete = async (req, res) => {
        // res.send('heyy deepak');
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { name } = req.params;
            console.log('🚀 ~ file: UserController.ts:139 ~ UserController ~ publicbulkDelete ~ req.params:', req.params);
            const result = await moduleService.bulkDelete(
                { name },
            );
            logger.info({ messgae: 'User deleted', data: [], option: [] });
            return res.send(SystemResponse.success('User deleted', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public async SetRedisValue(req, res) {
        const result = {
            value: req.body.value,
            key: req.body.key,
        };
        await CacheManager.setEx(result.key, 3600, JSON.stringify(result.value), '');
        return res.send(SystemResponse.success('Redis Value set', result.value));
    }

    // eslint-disable-next-line class-methods-use-this
    public async GetRedisValue(req, res) {
        const { key } = req.body;
        const getResponse = await CacheManager.get(key, '');
        res.send(SystemResponse.success('Redis Value get', patternMatecherhelper(getResponse)));
    }

    // eslint-disable-next-line class-methods-use-this
    public registration = async (req, res, next) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        const availableServices = services.get(Services.NOTIFICATION_SERVICE);

        try {
            const { email, password, name } = req.body;
            const hashPassword = await bcrypt.hash(password, constants.BCRYPT_SALT_ROUNDS);
            // third party services check
            const response = await availableServices
                .initializedService
                .get(NotificationService.templateId.registration);
            const result = await moduleService.create({
                email,
                password: hashPassword,
                first_name: name,
            });
            if (response.isAxiosError === true) {
                return await res.send(
                    SystemResponse.badRequestError(
                        'Notification Service Unavailable, Error sending notification mail',
                        `${response.response ? response.response.data.error : response.response}, ${response.response ? response.response.data.message : response.response}`,
                    ),
                );
            }

            logger.info({
                message: 'User registered',
                data: [],
                option: [],
            });
            return res.send(
                SystemResponse.success(
                    'User registered successfully!',
                    result,
                ),
            );
        } catch (err) {
            logger.error({
                message: err.message,
                option: [{ Error: err.stack }],
            });
            return next(err);
        }
    };
}

export default UserController.getInstance();
