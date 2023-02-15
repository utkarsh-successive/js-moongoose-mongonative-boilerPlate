import { Router } from 'express';
import { SystemResponse } from './libs/response-handler';
import userRouter from './modules/user/router';
import initServiceMiddleware from './middleware/initServiceMiddleware';
import { Services } from './services/constants';
import UserService from './modules/user/UserService';

const appInfo = require('../package.json');

const router = Router();
/**
 * @swagger
 * /api/version:
 *   get:
 *     tags:
 *       - General
 *     description: Get Version
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Version Response
 *         schema:
 *           type: object
 *           properties:
 *             version:
 *               type: string
 *               description: Version of the API.
 *             description:
 *               type: string
 *               description: Description of the API.
 *             name:
 *               type: string
 *               description: Name of the API.
 */
router.get('/version', (req, res) => {
    try {
        const { version, name, description } = appInfo;
        return res.json({
            description,
            name,
            version,
        });
    } catch (err) {
        return res.send(SystemResponse.internalServerError);
    }
});

/**
 * @swagger
 * /api/health-check:
 *   get:
 *     tags:
 *       - General
 *     description: Health Check for Kuberenetes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: I am OK
 */
router.get('/health-check', (req, res) => {
    res.send('I am OK');
});

router.use('/user', initServiceMiddleware([], new UserService()), userRouter);

export default router;
