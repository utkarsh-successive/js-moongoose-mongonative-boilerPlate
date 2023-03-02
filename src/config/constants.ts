/* eslint-disable no-unused-vars */
export const SWAGGER_URL = '/api-docs';
export const API_PREFIX = '/api';

export const ABOUT = {
    description: 'Mongo-Native Boilerplate API with Swagger',
    in: 'Headers',
    name: 'Authorization',
    title: 'Mongo-Native-Boilerplate',
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

