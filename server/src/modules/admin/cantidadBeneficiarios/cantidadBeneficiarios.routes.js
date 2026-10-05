import { Router } from 'express';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { cantidadBenecificiariosController } from './cantidadBeneficiarios.controller.js';
import { cantidadBeneficiariosSchema } from './cantidadBeneficiarios.schema.js';
import { validateRequest } from '../../../middlewares/validateRequest.middlewares.js';

const routes = new Router();

// Add routes
routes
  .get('/', asyncHandler(cantidadBenecificiariosController.getById))
  .put(
    '/',
    validateRequest({ bodySchema: cantidadBeneficiariosSchema }),
    asyncHandler(cantidadBenecificiariosController.update),
  );

export default routes;
