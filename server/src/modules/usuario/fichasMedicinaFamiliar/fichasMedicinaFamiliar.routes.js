import { Router } from 'express';
import { fichasMedicinaFamiliarController } from './fihasMedicinaFamiliar.dependencias.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { validateBody } from '../../../middlewares/validateBody.middlewares.js';
import { fichasMedicinaFamiliarSchema } from './fichasMedicinaFamiliar.schema.js';

const routes = new Router();

routes.post(
  '/historial',
  validateBody(fichasMedicinaFamiliarSchema),
  asyncHandler(
    fichasMedicinaFamiliarController.getFichasLibres.bind(
      fichasMedicinaFamiliarController,
    ),
  ),
);

export default routes;
