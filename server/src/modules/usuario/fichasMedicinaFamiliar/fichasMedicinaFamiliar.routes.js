import { Router } from 'express';
import { FichasMedicinaFamiliarController } from './fichasMedicinaFamiliar.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { validateBody } from '../../../middlewares/validateBody.middlewares.js';
import {
  idParamSchema,
  validateRequest,
} from '../../../middlewares/validateRequest.middlewares.js';
import {
  fichasMedicinaFamiliarSchema,
  FechasCuadernoSchema,
  HorariasCuadernoSchema,
  reservarFichaSchema,
} from './fichasMedicinaFamiliar.schema.js';

const routes = new Router();

routes
  .get(
    '/fichas-programadas/:id',
    validateRequest({ paramsSchema: idParamSchema }),
    asyncHandler(FichasMedicinaFamiliarController.getFichasProgramadas),
  )
  .get(
    '/obtener-ficha/:id',
    validateRequest({ paramsSchema: idParamSchema }),
    asyncHandler(FichasMedicinaFamiliarController.getById),
  )
  .post(
    '/historial',
    validateBody(fichasMedicinaFamiliarSchema),
    asyncHandler(FichasMedicinaFamiliarController.getFichasLibres),
  )
  .post(
    '/fechas-cuaderno',
    validateRequest({ bodySchema: FechasCuadernoSchema }),
    asyncHandler(FichasMedicinaFamiliarController.GetFechasByCuaderno),
  )
  .post(
    '/obtener-horarias-fecha-cuaderno',
    validateRequest({ bodySchema: HorariasCuadernoSchema }),
    asyncHandler(FichasMedicinaFamiliarController.getHorariosByFechaByCuaderno),
  )
  .post(
    '/reservar-ficha',
    validateRequest({ bodySchema: reservarFichaSchema }),
    asyncHandler(FichasMedicinaFamiliarController.reservarFicha),
  );

export default routes;
