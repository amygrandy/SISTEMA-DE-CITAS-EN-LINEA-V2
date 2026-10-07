import { Router } from 'express';
import { ZonificacionConsultorioController } from '../../admin/zonificacionConsultorios/ZonificacionConsultorio.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import {
  idParamSchema,
  validateRequest,
} from '../../../middlewares/validateRequest.middlewares.js';

const routes = new Router();

routes.get(
  '/:id',
  validateRequest({ paramsSchema: idParamSchema }),
  asyncHandler(ZonificacionConsultorioController.CosultorioByOdontologia),
);

export default routes;
