import { TipoConsultorioRepository } from '../../../admin/tipoConsultorio/tipoconsultorio.repository.js';
import { ConsultorioRepository } from '../../../admin/consultorio/consultorio.repository.js';

export class GetConsultorioByEspecialidadUseCase {
  static async execute({ establecimiento_id, tipo_consultorio_id }) {
    const buscarTipoEstablecimiento = await TipoConsultorioRepository.getId({
      id: tipo_consultorio_id,
    });
    if (!buscarTipoEstablecimiento) {
      const err = new Error('No se encontro el tipo de consultorio');
      err.statusCode = 404;
      throw err;
    }
    const data =
      await ConsultorioRepository.getConsultorioByTipoByEstablecimiento({
        establecimiento_id,
        tipo_consultorio_id,
      });

    return data;
  }
}
