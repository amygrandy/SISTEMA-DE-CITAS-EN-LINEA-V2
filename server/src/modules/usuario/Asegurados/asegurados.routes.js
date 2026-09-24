import { Router } from 'express';
import { AseguradoController } from './asegurados.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';

const routes = new Router();

routes.get('/', asyncHandler(AseguradoController.getAsegurados));
routes.get('/select', asyncHandler(AseguradoController.getSelect));

export default routes;
