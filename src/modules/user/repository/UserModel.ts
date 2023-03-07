/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *           example: 63f326464ad394f1c4dbb47f
 *         name:
 *           type: string
 *           description: name of the user
 *           example: Siddhant Jain
 *         email:
 *           type: string
 *           description: email of the user
 *           example: siddhant123@gmail.com
 *         age:
 *           type: number
 *           description: age of the user
 *           example: 24
 *         address:
 *           type: object
 *           $ref: '#/components/schemas/AddressSchema'
 *         mobile_no:
 *           type: string
 *           description: mobile no. of the user
 *           example: +91-9866737834
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user info was added
 *           example: 2020-03-10T04:05:06.157Z
 *
 *     AddressSchema:
 *       type: object
 *       properties:
 *         flat_no:
 *           type: number
 *           description: flat info of the user
 *           example: 1
 *         city:
 *           type: string
 *           description: city info where user lived in
 *           example: dispur
 *         state:
 *           type: string
 *           description: state info where user lived in
 *           example: assam
 *     UserListResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response message
 *           example: List of users
 *         status:
 *           type: number
 *           example: 200
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 */
