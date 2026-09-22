import { Router } from 'express';
import AdminRoutes from './routes/Admin.routes.js';
import UsuarioRoutes from './routes/Usuario.routes.js';
import AuthUsuarioRoutes from '../modules/usuario/AuthUsuario/authUsuario.routes.js';

import { chechkAuthPaciente } from '../middlewares/auth.middlewares.js';

const routes = new Router();

routes.use('/login-usuario', AuthUsuarioRoutes);
routes.use('/admin', AdminRoutes);
routes.use('/usuario', chechkAuthPaciente, UsuarioRoutes);

export default routes;
