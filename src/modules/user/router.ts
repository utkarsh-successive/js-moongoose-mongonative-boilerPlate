import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import controller from './UserController';
import validation from './validation';

const router = Router();

/**
 * @swagger
 * /api/user/bulk-insert:
 *   post:
 *     summary: Insert multiple user information
 *     tags: [User]
 *     requestBody:
 *       description: create multiple user information
 *       required: true
 *       name: users
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: name of the user
 *                       example: Siddhant Jain
 *                     email:
 *                       type: string
 *                       description: email of the user
 *                       example: siddhant123@gmail.com
 *                     age:
 *                       type: number
 *                       description: age of the user
 *                       example: 24
 *                     address:
 *                       type: object
 *                       $ref: '#/components/schemas/AddressSchema'
 *                     mobile_no:
 *                       type: string
 *                       description: mobile no. of the user
 *                       example: +91-9866737834
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: response message
 *                   example: Users added successfully
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 */
router
    .route('/bulk-insert')
    .post(
        validationHandler(validation.bulkInsert as any),
        controller.bulkInsert,
    );
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: create new user information
 *     tags: [User]
 *     requestBody:
 *       description: create new user information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - email
 *               - address
 *               - mobile_no
 *               - age
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name of the user
 *                 example: Siddhant Jain
 *               email:
 *                 type: string
 *                 description: email of the user
 *                 example: siddhant123@gmail.com
 *               age:
 *                 type: number
 *                 description: age of the user
 *                 example: 24
 *               address:
 *                 type: object
 *                 $ref: '#/components/schemas/AddressSchema'
 *               mobile_no:
 *                 type: string
 *                 description: mobile no. of the user
 *                 example: +91-9866737834
 *     responses:
 *       200:
 *         description: Fetch Created User Info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fetch user successfully
 *                   description: response message
 *                 status:
 *                   type: number
 *                   example: 200
 *                   description: status code
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
router
    .route('/')
    .post(validationHandler(validation.create as any), controller.create);
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User info API
 * /api/user:
 *   get:
 *     summary: List of all user records
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         type: number
 *         name: limit
 *         example: 10
 *       - in: query
 *         name: skip
 *         example: 0
 *         type: number
 *       - in: query
 *         name: name
 *         example: Siddhant Jain
 *         description: name of the user
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       404:
 *         description: Users not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users not found
 *                   description: response message
 *                 status:
 *                   type: number
 *                   example: 404
 *                   description: status code
 *                 error:
 *                   type: array
 *                   example: []
 */

router
    .route('/')
    .get(validationHandler(validation.list as any), controller.list);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Returns specific user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: _id of the user
 *         required: true
 *         example: 63f326464ad394f1c4dbb47f
 *     responses:
 *       200:
 *         description: Fetch user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fetch user successfully
 *                   description: response message
 *                 status:
 *                   type: number
 *                   example: 200
 *                   description: status code
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: response message
 *                   example: User not found
 *                 status:
 *                   type: string
 *                   example: 404
 *                   description: status code
 *                 error:
 *                   type: object
 *                   example: {}
 */
router
    .route('/:id')
    .get(validationHandler(validation.get as any), controller.get);

/**
 * @swagger
 * /api/user/bulk-update:
 *   put:
 *     summary: Updating existing users
 *     tags: [User]
 *     parameters:
 *        - in: query
 *          name: name
 *          type: string
 *          required: true
 *          description: name of the user
 *     consumes:
 *         - application/json
 *     requestBody:
 *        description: Enter fields for update information
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                mobile_no:
 *                 type: string
 *                 example: "1234567890"
 *                address:
 *                 type: object
 *                 $ref: '#/components/schemas/AddressSchema'
 *                age:
 *                 type: number
 *                 example: 120
 *     responses:
 *       200:
 *         description: Usersinfo update successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usersinfo update successfully
 *                   description: response message
 *                 status:
 *                   type: number
 *                   example: 200
 *                   description: status code
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: response message
 *                   example: User not found
 *                 status:
 *                   type: string
 *                   example: 404
 *                   description: status code
 *                 error:
 *                   type: object
 *                   example: {}
 */
router
    .route('/bulk-update')
    .put(
        validationHandler(validation.bulkUpdate as any),
        controller.bulkUpdate,
    );

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Updating existing user
 *     tags: [User]
 *     parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: _id of the user
 *     consumes:
 *         - application/json
 *     requestBody:
 *        description: Enter field for update information
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                name:
 *                 type: string
 *                 example: "xyz2"
 *                email:
 *                 type: string
 *                 example: "xyz@gmail2.com"
 *                mobile_no:
 *                 type: string
 *                 example: "1234567890"
 *                address:
 *                 type: object
 *                 $ref: '#/components/schemas/AddressSchema'
 *                age:
 *                 type: number
 *                 example: 120
 *     responses:
 *       200:
 *         description: Userinfo update successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Userinfo update successfully
 *                   description: response message
 *                 status:
 *                   type: number
 *                   example: 200
 *                   description: status code
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: response message
 *                   example: User not found
 *                 status:
 *                   type: string
 *                   example: 404
 *                   description: status code
 *                 error:
 *                   type: object
 *                   example: {}
 */
router
    .route('/:id')
    .put(validationHandler(validation.update as any), controller.update);

/**
 * @swagger
 * /api/user/bulk-delete:
 *   delete:
 *     summary: Delete multiple existing users
 *     tags: [User]
 *     parameters:
 *     - in: query
 *       name: name
 *       schema:
 *         type: string
 *         required: true
 *         description: name of the user
 *     responses:
 *       200:
 *         description: Users information deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: response message
 *                   example: Users information deleted
 *                 status:
 *                   type: number
 *                   example: 200
 */
router
    .route('/bulk-delete')
    .delete(
        validationHandler(validation.bulkDelete as any),
        controller.bulkDelete,
    );

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete existing user information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: _id of the user
 *     responses:
 *       200:
 *         description: User information deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: response message
 *                   example: User information deleted
 *                 status:
 *                   type: number
 *                   example: 200
 *
 */
router
    .route('/:id')
    .delete(validationHandler(validation.delete as any), controller.delete);

// router.route('/bulkDelete/:name')
//     .delete(
//         // validationHandler(validation.registration as any),
//         controller.bulkDelete,
//     );

export default router;
