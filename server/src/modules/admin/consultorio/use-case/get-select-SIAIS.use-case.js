import { ConsultorioRepository } from '../consultorio.repository.js';

export class GetSelectSIAISUseCase {
  static async execute({ queryEstablecimiento }) {
    const data = await ConsultorioRepository.getSelectSIAIS({
      establecimiento_id: queryEstablecimiento,
    });
    return data;
  }
}
