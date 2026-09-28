import { Router } from 'express';
import { PerfilController } from './perfil.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';

const routes = new Router();

routes.get('/asegurado', asyncHandler(PerfilController.getPerfilAsegurado));

export default routes;
