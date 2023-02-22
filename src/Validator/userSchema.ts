import Joi from 'joi'

import { validationMiddleware } from '../middleware/validationMiddleware';
const UsersValidate = {
//   index: () =>
//     validationMiddleware({
//       query: {
//         page: Joi.number(),
//         pageSize: Joi.number(),
//         sort: Joi.string(),
//         orderBy: Joi.string()
//       }
//     }),

  create: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile_no: Joi.string().max(10).required(),
        address: Joi.object().required(),
        age: Joi.number().required(),
      }
    }),

//   update: () =>
//     validationMiddleware({
//       body: {
//         name: Joi.string().optional(),
//         email: Joi.string().email().optional(),
//         password: Joi.string().min(6).max(100).optional(),
//         role: Joi.string().optional(),
//         birthdate: Joi.date().optional(),
//         gender: Joi.string().optional()
//       }
//     }),

//   refreshToken: () =>
//     validationMiddleware({
//       body: {
//         refresh_token: Joi.string().required()
//       }
//     })
}

export default UsersValidate