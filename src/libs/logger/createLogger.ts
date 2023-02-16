import * as winston from 'winston';

export class Create {
    // eslint-disable-next-line class-methods-use-this
    public createLogInstance = (loggerConfig) => winston.createLogger(loggerConfig);
}

export default new Create();
