import { Router } from 'express';
import AseguradosRoutes from '../../modules/usuario/Asegurados/asegurados.routes.js';
import HistorialRoutes from '../../modules/usuario/historial/historial.routes.js';
import FichasMedicinaFamiliarRoutes from '../../modules/usuario/fichasMedicinaFamiliar/fichasMedicinaFamiliar.routes.js';
import PerfilRoutes from '../../modules/usuario/pefil/perfil.routes.js';
import BeneficiariosRoutes from '../../modules/usuario/beneficiarios/beneficiario.routes.js';
import OdontologiaRoutes from '../../modules/usuario/odontlogia/ondotolgia.routes.js';
import EspecialidadesRoutes from '../../modules/usuario/especialidades/especialidades.routes.js';

const routes = new Router();

routes
  .use('/asegurados', AseguradosRoutes)
  .use('/historial', HistorialRoutes)
  .use('/perfil', PerfilRoutes)
  .use('/fichas-medicina-familiar', FichasMedicinaFamiliarRoutes)
  .use('/beneficiario', BeneficiariosRoutes)
  .use('/buscar-odontologia', OdontologiaRoutes)
  .use('/especialidades', EspecialidadesRoutes);

export default routes;
