import { Router } from 'express';
import { aseguradosController } from './asegurados.dependencias.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';

const routes = new Router();

routes.get(
  '/',
  asyncHandler(aseguradosController.getAsegurados.bind(aseguradosController)),
);

export default routes;
