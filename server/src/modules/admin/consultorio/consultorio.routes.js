import { Router } from 'express';
import { ConsultorioController } from './consultorio.controller.js';
import { EstablecimientoController } from '../establecimiento/establecimiento.controller.js';
import { TipoConsultorioController } from '../tipoConsultorio/tipoConsultorio.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';

import {
  idParamSchema,
  validateRequest,
} from '../../../middlewares/validateRequest.middlewares.js';
import { consultorioSchema, consultorioUpdateSchema } from './schema.js';

const routes = new Router();

routes
  .get('/', asyncHandler(ConsultorioController.getAll))
  .get('/SIAIS', asyncHandler(ConsultorioController.getAllSIAIS))
  .get('/establecimientos', asyncHandler(EstablecimientoController.getSelect))
  .get('/select-siais', asyncHandler(ConsultorioController.getAllSelectSIAIS))
  .get('/tipo-consultorio', asyncHandler(TipoConsultorioController.getSelect))
  .get(
    '/:id',
    validateRequest({ paramsSchema: idParamSchema }),
    asyncHandler(ConsultorioController.getIdSIAIS),
  )
  .post(
    '/',
    validateRequest({ bodySchema: consultorioSchema }),
    asyncHandler(ConsultorioController.create),
  )
  .patch(
    '/:id',
    validateRequest({
      paramsSchema: idParamSchema,
      bodySchema: consultorioUpdateSchema,
    }),
    asyncHandler(ConsultorioController.changeTipoConsultorio),
  )
  .patch(
    '/cambiar-estado/:id',
    validateRequest({
      paramsSchema: idParamSchema,
    }),
    asyncHandler(ConsultorioController.ChangeStatus),
  );

export default routes;
