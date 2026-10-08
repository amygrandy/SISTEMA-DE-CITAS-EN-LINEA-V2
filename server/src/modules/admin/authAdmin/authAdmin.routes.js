import { Router } from 'express';
import { AuthController } from './authAdmin.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { validateRequest } from '../../../middlewares/validateRequest.middlewares.js';
import { loginSchema } from './authAdmin.schema.js';
import { chechkAuthAdmin } from '../../../middlewares/auth.admin.middlewares.js';

const routes = new Router();

routes
  .post(
    '/',
    validateRequest({ bodySchema: loginSchema }),
    asyncHandler(AuthController.Login),
  )
  .get('/me', chechkAuthAdmin, asyncHandler(AuthController.getMe));

export default routes;
