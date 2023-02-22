import { config } from 'dotenv';
import * as constants from './constants';
import { IConfig } from './IConfig';

config();
const { version } = require('../../package.json');

const isMongooseDebug = (process.env.NODE_ENV === constants.EnvVars.DEV);
export const configurations: IConfig = Object.freeze({
    baseUrl: process.env.BASE_URL,
    apiPrefix: constants.API_PREFIX,
    corsOrigin: process.env.CORS_ORIGIN,
    env: process.env.NODE_ENV,
    mongo: process.env.MONGO_URL,
    mongooseDebug: isMongooseDebug,
    port: process.env.PORT,
    secret: process.env.SECRET_KEY,
    swaggerDefinition: {
        openapi: '3.0.0',
        basePath: constants.API_PREFIX,
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: [],
        }],
        info: {
            ...constants.ABOUT,
            version,
        },
        securityDefinitions: {
            Bearer: {
                in: constants.ABOUT.in,
                name: constants.ABOUT.name,
                type: constants.ABOUT.type,
            },
        },
    },
    swaggerUrl: constants.SWAGGER_URL,
}) as IConfig;

export default configurations;
