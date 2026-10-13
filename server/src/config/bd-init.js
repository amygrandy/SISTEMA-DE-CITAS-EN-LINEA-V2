import { sequelize } from './database.js';
import { PermisoModel } from '../models/permisos.model.js';
import { RolModel, RolPermisoModel } from '../models/roles.model.js';
import { UsuarioModel } from '../models/usuario.model.js';

//
import { EstablecimientoModel } from '../models/establecimiento.model.js';
import { ConsultorioModel } from '../models/consultorio.model.js';
import { TipoConsultorioModel } from '../models/tipoConsultorio.model.js';
import { ZodificacionConsultorioModel } from '../models/zonificacionConsultorio.model.js';
import {
  consultorioDiaSemanaModel,
  diaSemanaModel,
} from '../models/diaSemana.model.js';

import { CantidadBeneficiariosModel } from '../models/cantidadBeneficiarios.model.js';
import { HorarioHabilitacionModel } from '../models/horarioHabilitacion.model.js';
import { SancionInasistenciaModel } from '../models/sancioInasistencia.model.js';
//
import { cupoFichaModel } from '../models/cupoFichas.model.js';
import { FichaWebModel } from '../models/fichaWeb.model.js';
import { FichaEliminadaModel } from '../models/FichasEliminadas.model.js';

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

    // await TipoConsultorioModel.sync({ alter: true });
    // await ConsultorioModel.sync({ alter: true });

    // await ZodificacionConsultorioModel.sync({ alter: true });

    // await diaSemanaModel.sync({ alter: true });
    // await consultorioDiaSemanaModel.sync({ alter: true });

    //PARAMETROS GLOBALES
    // await CantidadBeneficiariosModel.sync({ alter: true });
    // await HorarioHabilitacionModel.sync({ alter: true });
    // await SancionInasistenciaModel.sync({ alter: true });

    // await cupoFichaModel.sync({ alter: true });

    await FichaWebModel.sync({ force: true });
    await FichaEliminadaModel.sync({ alter: true });

    console.log('✅ SE CARGO CORRECTAMENTE LAS TABLAS');
  } catch (e) {
    console.error('❌ Error DB:', e.message);
    process.exit(1);
  }
}

export async function CloseBD() {
  await sequelize.close();
}
