import { Router } from 'express';
import { HorarioHabilitacionController } from './horarioHabilitacion.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import {
  idParamSchema,
  validateRequest,
} from '../../../middlewares/validateRequest.middlewares.js';
import { HorarioHabilitacionSchema } from './horarioHabilitacion.schema.js';

const routes = new Router();

routes.get('/', asyncHandler(HorarioHabilitacionController.getById)).put(
  '/',
  validateRequest({
    bodySchema: HorarioHabilitacionSchema,
  }),
  asyncHandler(HorarioHabilitacionController.update),
);
export default routes;
