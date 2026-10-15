import { Router } from 'express';
import { ReporteController } from './controller.js';
import { EstablecimientoController } from '../establecimiento/establecimiento.controller.js';
import { ConsultorioController } from '../consultorio/consultorio.controller.js';
import {
  validateRequest,
  idParamSchema,
} from '../../../middlewares/validateRequest.middlewares.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { reporteSchema } from './shema.js';

const routes = new Router();

routes
  .get('/establecimiento', asyncHandler(EstablecimientoController.getSelect))
  .get(
    '/consultorio/:id',
    validateRequest({ paramsSchema: idParamSchema }),
    asyncHandler(ConsultorioController.getSelectByIdEstablecimiento),
  )
  .post(
    '/consultorio-medico',
    validateRequest({ bodySchema: reporteSchema }),
    asyncHandler(ReporteController.getAllByConsultorioByMedico),
  );

export default routes;
