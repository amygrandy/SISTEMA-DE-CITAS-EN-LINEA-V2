import { Router } from 'express';
import RolRoutes from '../../modules/admin/roles/rol.routes.js';
import EstablecimientoRoutes from '../../modules/admin/establecimiento/establecimiento.routes.js';
import PoblacionRoutes from '../../modules/admin/poblacion/poblacion.routes.js';
import ConsultorioRoutes from '../../modules/admin/consultorio/consultorio.routes.js';
import TipoConsultorioRoutes from '../../modules/admin/tipoConsultorio/tipoConsultorio.routes.js';
import ZonificacionConsultorioRoutes from '../../modules/admin/zonificacionConsultorios/ZonificacionConsultorio.routes.js';
import HorarioHabilitacionRoutes from '../../modules/admin/horarioHabilitacion/horarioHabilitacion.routes.js';

const routes = new Router();

routes
  .use('/rol', RolRoutes)
  .use('/establecimiento', EstablecimientoRoutes)
  .use('/consultorio', ConsultorioRoutes)
  .use('/tipo-consultorio', TipoConsultorioRoutes)
  .use('/zonificacion', ZonificacionConsultorioRoutes)
  .use('/poblacion', PoblacionRoutes)
  .use('horario-habilitacion', HorarioHabilitacionRoutes);

export default routes;
