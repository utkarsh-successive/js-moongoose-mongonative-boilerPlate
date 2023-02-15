import { NextFunction, Request, Response } from 'express';
import { SystemResponse } from '../response-handler';

export default (req: Request, res: Response, next: NextFunction) => next(SystemResponse.notFoundError('', ''));
