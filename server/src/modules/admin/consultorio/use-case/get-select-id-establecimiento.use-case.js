import { ConsultorioRepository } from '../consultorio.repository.js';

export class GetSelectByIdEstablecimientoUseCase {
  static async execute({ establecimiento_id }) {
    const data = await ConsultorioRepository.getSelectByIdEstablecimiento({
      establecimiento_id,
    });
    return data;
  }
}
