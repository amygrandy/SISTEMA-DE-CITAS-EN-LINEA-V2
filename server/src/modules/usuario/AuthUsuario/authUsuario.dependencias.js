import AuthUsuarioRepository from './authUsuario.repository.js';
import RolRepository from '../../admin/roles/rol.respository.js';
//
import IniciarSesionUseCase from './iniciar-sesion.use-case.js';

import AuthUsuarioController from './authUsuario.controller.js';

const authUsuarioRepository = new AuthUsuarioRepository();
const rolRepository = new RolRepository();

const iniciarSesionUseCase = new IniciarSesionUseCase({
  authUsuarioRepository,
  rolRepository,
});

const authUsuarioController = new AuthUsuarioController({
  iniciarSesionUseCase,
});

export { authUsuarioController };
