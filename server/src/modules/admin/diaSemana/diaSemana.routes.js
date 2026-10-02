import { Router } from 'express';
import { DiaSemanaController } from './diaSemana.controller.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';

const routes = new Router();

routes.get('/select', asyncHandler(DiaSemanaController.getSelect));

export default routes;
