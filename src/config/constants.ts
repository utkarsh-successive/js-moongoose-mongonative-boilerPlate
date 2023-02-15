/* eslint-disable no-unused-vars */
export const SWAGGER_URL = '/api-docs';
export const API_PREFIX = '/api';

export const ABOUT = {
    description: 'Users-Express-Boilerplate API with Swagger',
    in: 'Headers',
    name: 'Authorization',
    title: 'Node-Express-Boilerplate',
    type: 'apiKey',
};

// eslint-disable-next-line no-shadow
export enum EnvVars {
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  PROD = 'prod',
}

export const levels = {
    INFO: 'info',
    DEBUG: 'debug',
};

export const NotificationService = {
    requestType: 'post',
    route: '/notification',
    templateId: {
        registration: 'registration',
        forgotPassword: 'forgotPassword',
    },
};

export const BCRYPT_SALT_ROUNDS: number = 6;
