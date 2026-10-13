import { Router } from 'express';
import { TipoConsultorioController } from '../../admin/tipoConsultorio/tipoConsultorio.controller.js';
import { EspecialidadesController } from './especialidades.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { EspecialidadSchema } from './schema.js';
import { validateRequest } from '../../../middlewares/validateRequest.middlewares.js';

const routes = new Router();

routes
  .get('/tipos', asyncHandler(TipoConsultorioController.getSelectUsuario))
  .post(
    '/consultorios',
    validateRequest({ bodySchema: EspecialidadSchema }),
    asyncHandler(EspecialidadesController.GetConsultorioByEspecialidad),
  );

export default routes;
