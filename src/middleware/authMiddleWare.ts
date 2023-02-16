import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { SystemResponse } from '../libs/response-handler';
import config from '../config/configuration';

function authMiddleWare(req: Request, res: Response, next: NextFunction) {
    const { logger } = res.locals;

    try {
        const { secret } = config;
        let token = req.header('Authorization');

        if (token.startsWith('Bearer ')) {
            token = token.substring(7, token.length);
        }

        if (!token) {
            logger.debug({ message: 'Token not found' });
            throw new Error('Token not found');
        }

        const verifiedToken = jwt.verify(token, secret);

        if (!verifiedToken) {
            logger.debug({ message: 'User token not verified' });
            throw new Error('User token not verified');
        }

        res.locals.user = verifiedToken;
        logger.debug({ message: 'Valid token with user details', data: [{ verifiedToken }] });

        next();
    } catch (err) {
        logger.error({ message: err.message, error: err.stack });
        res.send(SystemResponse.badRequestError('Error', err.message));
        throw new Error(err);
    }
}

export default authMiddleWare;
