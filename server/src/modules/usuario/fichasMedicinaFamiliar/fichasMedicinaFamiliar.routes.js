import { Router } from 'express';
import { FichasMedicinaFamiliarController } from './fichasMedicinaFamiliar.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { validateBody } from '../../../middlewares/validateBody.middlewares.js';
import { validateRequest } from '../../../middlewares/validateRequest.middlewares.js';
import {
  fichasMedicinaFamiliarSchema,
  FechasCuadernoSchema,
} from './fichasMedicinaFamiliar.schema.js';

const routes = new Router();

routes
  .post(
    '/historial',
    validateBody(fichasMedicinaFamiliarSchema),
    asyncHandler(FichasMedicinaFamiliarController.getFichasLibres),
  )
  .post(
    '/fechas-cuaderno',
    validateRequest({ bodySchema: FechasCuadernoSchema }),
    asyncHandler(FichasMedicinaFamiliarController.GetFechasByCuaderno),
  );

export default routes;
