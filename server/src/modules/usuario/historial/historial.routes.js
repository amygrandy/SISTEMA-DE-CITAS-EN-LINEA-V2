import { Router } from 'express';
import { HistorialController } from './historial.controller.js';
import {
  idParamSchema,
  validateRequest,
} from '../../../middlewares/validateRequest.middlewares.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';

const routes = new Router();

routes.get(
  '/:id',
  validateRequest({ paramsSchema: idParamSchema }),
  asyncHandler(HistorialController.getHistorial),
);

export default routes;
