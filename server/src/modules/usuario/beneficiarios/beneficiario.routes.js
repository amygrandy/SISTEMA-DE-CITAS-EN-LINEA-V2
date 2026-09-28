import { Router } from 'express';
import { BeneficiariosController } from './beneficiario.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';

const routes = new Router();

routes.get('/', asyncHandler(BeneficiariosController.getBenericiarios));

export default routes;
