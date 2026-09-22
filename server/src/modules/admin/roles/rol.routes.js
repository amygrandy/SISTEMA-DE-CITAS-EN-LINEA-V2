import { Router } from 'express';
import { rolController } from './rol.dependencias.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { validateParams } from '../../../middlewares/validateParams.middlewares.js';
import { IdSchema } from '../../../shared/utils/IdSchema.js';

const routes = new Router();

routes
  .get('/', asyncHandler(rolController.getAllRoles.bind(rolController)))
  .get(
    '/:id',
    validateParams(IdSchema),
    asyncHandler(rolController.getById.bind(rolController)),
  )
  .post('/', asyncHandler(rolController.create.bind(rolController)))
  .patch(
    '/:id',
    validateParams(IdSchema),
    asyncHandler(rolController.update.bind(rolController)),
  );

export default routes;
