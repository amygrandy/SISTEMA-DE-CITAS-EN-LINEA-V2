import { Router } from 'express';
import { ZonificacionConsultorioController } from './ZonificacionConsultorio.controller.js';
import { EstablecimientoController } from '../establecimiento/establecimiento.controller.js';
import { ConsultorioController } from '../consultorio/consultorio.controller.js';
import {
  validateRequest,
  idParamSchema,
} from '../../../middlewares/validateRequest.middlewares.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { ZonificacionSchema, ZonificacionUpdateSchema } from './schema.js';

const routes = new Router();

routes
  .get('/', asyncHandler(ZonificacionConsultorioController.getAll))
  .get('/establecimiento', asyncHandler(EstablecimientoController.getSelect))
  .get(
    '/consultorio/:id',
    validateRequest({ paramsSchema: idParamSchema }),
    asyncHandler(ConsultorioController.getSelectByIdEstablecimiento),
  )
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
