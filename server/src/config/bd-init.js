import { sequelize } from './database.js';
import { PermisoModel } from '../models/permisos.model.js';
import { RolModel, RolPermisoModel } from '../models/roles.model.js';
import { UsuarioModel } from '../models/usuario.model.js';

//
import { EstablecimientoModel } from '../models/establecimiento.model.js';
import { ConsultorioModel } from '../models/consultorio.model.js';
import { TipoConsultorioModel } from '../models/tipoConsultorio.model.js';
import { ZodificacionConsultorioModel } from '../models/zonificacionConsultorio.model.js';

export async function ConnectBD() {
  try {
    console.log('🌐 Conectando a la base de datos PostgreSQL...');
    await sequelize.authenticate();
    console.log('✅ CONEXION OK');
    // await PermisoModel.sync({ alter: true });
    // await RolModel.sync({ alter: true });
    // await RolPermisoModel.sync({ alter: true });

    // await UsuarioModel.sync({ alter: true });

    // await EstablecimientoModel.sync({ alter: true });
    //
    // await TipoConsultorioModel.sync({ alter: true });
    // await ConsultorioModel.sync({ alter: true });

    // await ZodificacionConsultorioModel.sync({ alter: true });

    console.log('✅ SE CARGO CORRECTAMENTE LAS TABLAS');
  } catch (e) {
    console.error('❌ Error DB:', e.message);
    process.exit(1);
  }
}

export async function CloseBD() {
  await sequelize.close();
}
