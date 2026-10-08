import { Router } from 'express';
import AdminRoutes from './routes/Admin.routes.js';
import UsuarioRoutes from './routes/Usuario.routes.js';
import AuthUsuarioRoutes from '../modules/usuario/AuthUsuario/authUsuario.routes.js';
import AuthAdmin from '../modules/admin/authAdmin/authAdmin.routes.js';

import { chechkAuthPaciente } from '../middlewares/auth.middlewares.js';
import { chechkAuthAdmin } from '../middlewares/auth.admin.middlewares.js';

const routes = new Router();

routes.use('/login-usuario', AuthUsuarioRoutes);
routes.use('/login-admin', AuthAdmin);
routes.use('/admin', chechkAuthAdmin, AdminRoutes);
routes.use('/usuario', chechkAuthPaciente, UsuarioRoutes);

export default routes;
