import { Router } from 'express';
import { ControlInasistenciaController } from './controlInasistencia.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { validateRequest } from '../../../middlewares/validateRequest.middlewares.js';
import { ControlInasistenciaSchema } from './controlInasistencia.schema.js';

const routes = new Router();

// Add routes
routes
  .get('/', asyncHandler(ControlInasistenciaController.getById))
  .put(
    '/',
    validateRequest({ bodySchema: ControlInasistenciaSchema }),
    asyncHandler(ControlInasistenciaController.update),
  );

export default routes;
