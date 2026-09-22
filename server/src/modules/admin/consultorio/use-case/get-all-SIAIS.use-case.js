import { ConsultorioRepository } from '../consultorio.repository.js';

export class GetAllEspecialidadUseCase {
  static async execute({ queryEstablecimiento }) {
    const data = await ConsultorioRepository.getAllSIAIS({
      establecimiento_id: queryEstablecimiento,
    });
    return data;
  }
}
