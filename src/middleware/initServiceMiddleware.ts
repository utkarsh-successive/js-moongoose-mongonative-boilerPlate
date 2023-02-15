import InitService from '../services/initService';

const initServiceMiddleware = (service: string[], moduleService) => (req, res, next) => {
    res.services = new InitService(res, service, moduleService);
    next();
};

export default initServiceMiddleware;
