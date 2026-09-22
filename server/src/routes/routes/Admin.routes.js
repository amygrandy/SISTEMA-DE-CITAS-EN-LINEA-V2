import { Router } from 'express';
import RolRoutes from '../../modules/admin/roles/rol.routes.js';
import EstablecimientoRoutes from '../../modules/admin/establecimiento/establecimiento.routes.js';
import PoblacionRoutes from '../../modules/admin/poblacion/poblacion.routes.js';
import ConsultorioRoutes from '../../modules/admin/consultorio/consultorio.routes.js';
import TipoConsultorioRoutes from '../../modules/admin/tipoConsultorio/tipoConsultorio.routes.js';
import ZonificacionConsultorioRoutes from '../../modules/admin/zonificacionConsultorios/ZonificacionConsultorio.routes.js';

const routes = new Router();

routes
  .use('/rol', RolRoutes)
  .use('/establecimiento', EstablecimientoRoutes)
  .use('/consultorio', ConsultorioRoutes)
  .use('/tipo-consultorio', TipoConsultorioRoutes)
  .use('/zonificacion', ZonificacionConsultorioRoutes)
  .use('/poblacion', PoblacionRoutes);

export default routes;
