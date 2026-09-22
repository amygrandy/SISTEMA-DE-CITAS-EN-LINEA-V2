import { Router } from 'express';

import {
  idParamSchema,
  validateRequest,
} from '../../../middlewares/validateRequest.middlewares.js';
import {
  TipoConsultorioSchema,
  TipoConsultorioUpdateSchema,
} from './tipoConsultorio.schema.js';
import { TipoConsultorioController } from './tipoConsultorio.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';

const routes = new Router();

routes
  .get('/', asyncHandler(TipoConsultorioController.getAll))
  .post(
    '/',
    validateRequest({
      bodySchema: TipoConsultorioSchema,
    }),
    asyncHandler(TipoConsultorioController.create),
  )
  .patch(
    '/:id',
    validateRequest({
      paramsSchema: idParamSchema,
      bodySchema: TipoConsultorioUpdateSchema,
    }),
    asyncHandler(TipoConsultorioController.update),
  )
  .patch(
    '/cambiar-estado/:id',
    validateRequest({
      paramsSchema: idParamSchema,
    }),
    asyncHandler(TipoConsultorioController.changeStatus),
  );

export default routes;
