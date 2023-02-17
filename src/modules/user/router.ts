/* eslint-disable max-len */
import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import controller from './UserController';
import validation from './validation';

const router = Router();
/**
 * @swagger
 * definitions:
 *   UserSchema:
 *        properties:
 *             id:
 *                  type: string
 *             name:
 *                  type: string
 *             email:
 *                  type: string
 *             mobile_no:
 *                  type: string
 *             age:
 *                  type: string
 *             address:
 *                  type: object 
 *             createdAt:
 *                  type: string
 *             deletedAt:
 *                  type: string
 *   AddressSchema:
 *        properties:
 *             flat_no:
 *                  type: number
 *                  example: 2
 *             city:
 *                  type: string
 *                  example: "xyz"
 *             state:
 *                  type: string
 *                  example: "xyz"
 *                
 *   UserList:
 *        type: array
 *        item:
 *        $ref: '#/definitions/UserSchema'
 *   user:
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
 *                  $ref: '#/definitions/user'
 */
/**
 * @swagger
 * /api/user/:
 *   get:
 *        tags: 
 *           - User
 *        description: Returns all the User list records
 *        parameters:
 *           - in: query
 *             name: limit
 *           - in: query
 *             name: skip
 *        responses :
 *             200:
 *                  description: Array of User List
 *                  schema:
 *                       $ref: '#/definitions/UserSchema'
 */

router.route('/')
    .get(
        validationHandler(validation.list as any),
        controller.list,
    );
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *        tags: [User]
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
 *                  description: Array of user List
 *                  schema:
 *                       $ref: '#/definitions/UserByIdGetResponse'
 */
router.route('/:id')
    .get(
        validationHandler(validation.get as any),
        controller.get,

    );

/**
 * @swagger
 * /api/user:
 *   post:
 *        description: Added new Record in database
 *        tags: [User]
 *        requestBody:
 *              description: Enter name, email, mobile_no, age, address .
 *              required: true
 *              content:
 *                 application/json:
 *                    schema:
 *                        type: object
 *                        required:
 *                          -name
 *                          -description
 *                        properties:
 *                            name:
 *                               type: string
 *                               example: "xyz"
 *                            email:
 *                               type: string
 *                               example: "xyz@gmail.com"
 *                            mobile_no:
 *                               type: string
 *                               example: "1234567890"
 *                            age:
 *                               type: number
 *                               example: 20
 *                            address:
 *                               type: object
 *                               $ref: '#/definitions/AddressSchema'
 *        responses:
 *                  200:
 *                      description: Record added succesfully
 */
router.route('/')
    .post(
        validationHandler(validation.create as any),
        controller.create,
    );
    /**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     description: Update existing user
 *     tags: [User]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *           type: string
 *           required: true
 *           description: originalId of the user
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
 *               name:
 *                type: string
 *                example: "xyz2"
 *               email:
 *                type: string
 *                example: "xyz@gmail2.com"
 *               mobile_no:
 *                type: string
 *                example: "1234567890"
 *               address:
 *                type: object
 *                $ref: '#/definitions/AddressSchema'
 *               age:
 *                type: number
 *                example: 120
 *     responses:
 *         200:
 *           description: Userinfo update successfully
 */

router.route('/:id')
    .put(
        validationHandler(validation.update as any),
        controller.update,
    );
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *        description: Delete existing record from database
 *        tags: [User]
 *        parameters:
 *        - in: path
 *          name: id
 *          schema:
 *           type: string
 *           required: true
 *           description: originalId of the user
 *        responses:
 *                  200:
 *                      description: Record deleted succesfully
 */    
router.route('/:id')
    .delete(
        validationHandler(validation.delete as any),
        controller.delete,
    );

export default router;
