import { Router } from 'express';
import { EstablecimientoController } from './establecimiento.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { validateParams } from '../../../middlewares/validateParams.middlewares.js';
import { IdSchema } from '../../../shared/utils/IdSchema.js';

const routes = new Router();

routes
  .get(
    '/SIAIS',
    asyncHandler(EstablecimientoController.getAllEstablecimientoSIAIS),
  )
  .get('/', asyncHandler(EstablecimientoController.getAll));

export default routes;
