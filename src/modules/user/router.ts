import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import controller from './UserController';
import validation from './validation';
import authMiddleWare from '../../middleware/authMiddleWare';
import UsersValidate from '../../Validator/userSchema';


const router = Router();
/** Use to set and get redis value */
router.route('/SetRedisValue')
    .get(
        controller.SetRedisValue,
    );
router.route('/GetRedisValue')
    .get(
        controller.GetRedisValue,
    );
/**
 * @swagger
 * securityDefinitions:
 *  APIKeyHeader:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

/**
 * @swagger
 * definitions:
 *   UserSchema:
 *        properties:
 *             id:
 *                  type: string
 *             originalId:
 *                  type: string
 *             first_name:
 *                  type: string
 *             last_name:
 *                  type: string
 *             createdAt:
 *                  type: string
 *             deletedAt:
 *                  type: string
 *   Users:
 *        type: array
 *        item:
 *        $ref: '#/definitions/UserSchema'
 *   User:
 *        type: array
 *        $ref: '#/definitions/UserSchema'
 *   UserListResponse:
 *        properties:
 *             message:
 *                  type: string
 *                  example: Success
 *             status:
 *                  type: integer
 *                  example: 200
 *             data:
 *                  $ref: '#/definitions/User'
 *   UserByIdGetResponse:
 *        properties:
 *             message:
 *                  type: string
 *                  example: Success
 *             status:
 *                  type: integer
 *                  example: 200
 *             data:
 *                  $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /api/users/:
 *   get:
 *        tags: [USER]
 *        description: Returns all Users
 *        security:
 *             - bearerAuth: []
 *        parameters:
 *           - in: query
 *             name: limit
 *           - in: query
 *             name: skip
 *        responses :
 *             200:
 *                  description: Array of Users
 *                  schema:
 *                       $ref: '#/definitions/UserListResponse'
 */
router.route('/')
    .get(
        validationHandler(validation.list as any),
        authMiddleWare,
        controller.list,
    );

/**
 * @swagger
 * /api/users:
 *   post:
 *        description: Added first_name, last_name
 *        tags: [USER]
 *        requestBody:
 *              description: Enter first_name , last_name.
 *              required: true
 *              content:
 *                 application/json:
 *                    schema:
 *                        type: object
 *                        required:
 *                          -first_name
 *                          -last_name
 *                        properties:
 *                            first_name:
 *                               type: string
 *                            last_name:
 *                               type: string
 *        responses:
 *                  200:
 *                      description: User added succesfully
 */
router.route('/')
    .post(
        // validationHandler(validation.create as any),
        UsersValidate.create,
        // authMiddleWare,
        controller.create,
    );
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *        tags: [USER]
 *        description: Returns specific user
 *        parameters:
 *           - in: path
 *             name: id
 *             schema:
 *              type: string
 *              required: true
 *              description: originalId of the user
 *        responses :
 *             200:
 *                  description: Array of ToDo List
 *                  schema:
 *                       $ref: '#/definitions/UserByIdGetResponse'
 */
router.route('/:id')
    .get(
        validationHandler(validation.get as any),
        authMiddleWare,
        controller.get,

    );

/**
 * @swagger
 * /api/users/:
 *   put:
 *     description: Update existing user
 *     tags: [USER]
 *     consumes:
 *         - application/json
 *     requestBody:
 *        description: Enter field for update record
 *        required: true
 *        content:
 *           application/json:
 *            schema:
 *             type: object
 *             required:
 *              -id
 *             properties:
 *               id:
 *                type: string
 *               first_name:
 *                type: string
 *               last_name:
 *                type: string
 *     responses:
 *         200:
 *           description: Record updated successfully
 */
router.route('/')
    .put(
        validationHandler(validation.update as any),
        authMiddleWare,
        controller.update,
    );

/**
 * @swagger
 * /api/users:
 *   delete:
 *        description: Delete existing user from database
 *        tags: [USER]
 *        requestBody:
 *              description: Enter id.
 *              required: true
 *              content:
 *                 application/json:
 *                    schema:
 *                        type: object
 *                        required:
 *                          -id
  *                        properties:
 *                            id:
 *                               type: string
 *        responses:
 *                  200:
 *                      description: User deleted succesfully
 */
router.route('/')
    .delete(
        validationHandler(validation.delete as any),
        authMiddleWare,
        controller.delete,
    );
/**
 * @swagger
 * /api/users/login:
 *   post:
 *        description: creating token
 *        tags: [USER]
 *        requestBody:
 *              description: Enter email , password .
 *              required: true
 *              content:
 *                 application/json:
 *                    schema:
 *                        type: object
 *                        required:
 *                          -email
 *                          -password
 *                        properties:
 *                            email:
 *                               type: string
 *                            password:
 *                               type: string
 *        responses:
 *                  200:
 *                      description: Token Generated succesfully
 */
//* ** To create token for authorization in the headers */
// router.route('/login')
//     .post(UserLogin.login);

// router.route('/forgotPassword')
//     .post(UserLogin.forgotPassword);

/**
 * @swagger
 * /api/users/registration:
 *   post:
 *        description: Userd for registration token
 *        tags: [USER]
 *        requestBody:
 *              description: Enter email , password .
 *              required: true
 *              content:
 *                 application/json:
 *                    schema:
 *                        type: object
 *                        required:
 *                          -email
 *                          -password
 *                        properties:
 *                            email:
 *                               type: string
 *                            password:
 *                               type: string
 *        responses:
 *                  200:
 *                      description: Registation done
 */
router.route('/registration')
    .post(
        validationHandler(validation.registration as any),
        controller.registration,
    );

export default router;
