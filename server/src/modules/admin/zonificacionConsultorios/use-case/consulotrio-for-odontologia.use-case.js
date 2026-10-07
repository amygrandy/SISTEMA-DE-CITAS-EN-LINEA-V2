import { ZonificacionConsultorioRepository } from '../ZonificacionConsultorio.repository.js';
import { ConsultorioRepository } from '../../consultorio/consultorio.repository.js';

export class CosultorioByOdontologiaUseCase {
  static async execute({ cuaderno_id }) {
    const buscarConsultorio = await ConsultorioRepository.getById({
      id: cuaderno_id,
    });
    if (!buscarConsultorio) {
      const err = new Error(
        'No se encontro el consultorio de medicina familiar',
      );
      err.statusCode = 404;
      throw err;
    }
    const data =
      await ZonificacionConsultorioRepository.consultorioForOndontologia({
        cuaderno_id,
      });
    if (!data) {
      const err = new Error('No tiene asignado un consultorio de odontologia');
      err.statusCode = 404;
      throw err;
    }
    return data.consultorioAsignado;
  }
}
