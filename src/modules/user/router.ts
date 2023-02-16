/* eslint-disable max-len */
import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import controller from './UserController';
import validation from './validation';

const router = Router();

router.route('/')
    .get(
        validationHandler(validation.list as any),
        controller.list,
    );

router.route('/:id')
    .get(
        validationHandler(validation.get as any),
        controller.get,

    );

router.route('/')
    .post(
        validationHandler(validation.create as any),
        controller.create,
    );

router.route('/:id')
    .put(
        validationHandler(validation.update as any),
        controller.update,
    );
router.route('/:id')
    .delete(
        validationHandler(validation.delete as any),
        controller.delete,
    );

export default router;
