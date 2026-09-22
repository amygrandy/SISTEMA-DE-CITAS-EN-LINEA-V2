import { Router } from 'express';
import { controller } from './poblacion.dependencias.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { chechkAuthPaciente } from '../../../middlewares/auth.middlewares.js';

const routes = new Router();

routes
  .post('/', asyncHandler(controller.getAseguradoTitular.bind(controller)))
  .get(
    '/me',
    chechkAuthPaciente,
    asyncHandler(controller.getMe.bind(controller)),
  );

export default routes;
