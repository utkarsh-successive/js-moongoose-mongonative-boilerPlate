import { checkSchema, validationResult } from 'express-validator';
import { SystemResponse } from './response-handler';

const validationHandler = (validator) => [
  checkSchema(validator) as any,
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          next(SystemResponse.badRequestError('', errors.array().map(({ location, param, msg }) => ({ location, param, msg }))));
      }
      next();
  },
];
export default validationHandler;
