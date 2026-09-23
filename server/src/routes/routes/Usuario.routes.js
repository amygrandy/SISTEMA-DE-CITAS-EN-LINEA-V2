import { Router } from 'express';
import AseguradosRoutes from '../../modules/usuario/Asegurados/asegurados.routes.js';
import HistorialRoutes from '../../modules/usuario/historial/historial.routes.js';
import FichasMedicinaFamiliarRoutes from '../../modules/usuario/fichasMedicinaFamiliar/fichasMedicinaFamiliar.routes.js';

const routes = new Router();

routes
  .use('/asegurados', AseguradosRoutes)
  .use('/historial', HistorialRoutes)
  .use('/fichas-medicina-familiar', FichasMedicinaFamiliarRoutes);

export default routes;
