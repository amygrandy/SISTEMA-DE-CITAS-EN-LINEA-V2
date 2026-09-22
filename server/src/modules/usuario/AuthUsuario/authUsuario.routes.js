import { Router } from 'express';
import { authUsuarioController } from './authUsuario.dependencias.js';
import { asyncHandler } from '../../../shared/utils/asyncHandler.js';
import { chechkAuthPaciente } from '../../../middlewares/auth.middlewares.js';
import { validateBody } from '../../../middlewares/validateBody.middlewares.js';
import { loginSchema } from './authUsuario.schema.js';

const routes = new Router();

routes
  .post(
    '/',
    validateBody(loginSchema),
    asyncHandler(
      authUsuarioController.IniciarSesion.bind(authUsuarioController),
    ),
  )
  .get(
    '/me',
    chechkAuthPaciente,
    asyncHandler(authUsuarioController.getMe.bind(authUsuarioController)),
  );

export default routes;
