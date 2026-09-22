import { Router } from 'express';
import { ZonificacionConsultorioController } from './ZonificacionConsultorio.controller.js';
import {
  validateRequest,
  idParamSchema,
} from '../../../middlewares/validateRequest.middlewares.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { ZonificacionSchema, ZonificacionUpdateSchema } from './schema.js';

const routes = new Router();

routes
  .get('/', asyncHandler(ZonificacionConsultorioController.getAll))
  .get(
    '/:id',
    validateRequest({ paramsSchema: idParamSchema }),
    asyncHandler(ZonificacionConsultorioController.getId),
  )
  .post(
    '/',
    validateRequest({ bodySchema: ZonificacionSchema }),
    asyncHandler(ZonificacionConsultorioController.create),
  )
  .patch(
    '/:id',
    validateRequest({
      paramsSchema: idParamSchema,
      bodySchema: ZonificacionUpdateSchema,
    }),
    asyncHandler(ZonificacionConsultorioController.update),
  );

export default routes;
