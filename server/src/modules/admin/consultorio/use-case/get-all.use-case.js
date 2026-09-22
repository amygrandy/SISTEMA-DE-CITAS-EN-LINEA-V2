import { ConsultorioRepository } from '../consultorio.repository.js';

export class GetAllUseCase {
  static async execute({ queryEstablecimiento, queryTipoConsultorio }) {
    const data = await ConsultorioRepository.getAll({
      establecimiento_id: queryEstablecimiento,
      tipo_consultorio_id: queryTipoConsultorio,
    });
    return data;
  }
}
