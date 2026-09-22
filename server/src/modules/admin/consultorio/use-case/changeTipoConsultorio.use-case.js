import { ConsultorioRepository } from '../consultorio.repository.js';
import { TipoConsultorioRepository } from '../../tipoConsultorio/tipoconsultorio.repository.js';

export class ChangeTipoConsultorioUseCase {
  static async execute({ id, payload }) {
    const buscarConsultorio = await ConsultorioRepository.getById({ id });
    if (!buscarConsultorio) {
      const err = new Error('No se encontro el consultorio');
      err.statusCode = 404;
      throw err;
    }
    const buscarTipoConsultorio = await TipoConsultorioRepository.getId({
      id: payload.tipo_consultorio_id,
    });
    if (!buscarTipoConsultorio) {
      const err = new Error('No se encontro el tipo de consultorio');
      err.statusCode = 404;
      throw err;
    }

    const data = await ConsultorioRepository.changeTipoConsultorio({
      id,
      payload,
    });
    return data;
  }
}
