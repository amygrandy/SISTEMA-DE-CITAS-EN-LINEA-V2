import { CantidadBeneficiariosRepository } from '../cantidadBenecifiarios.respository.js';

export class UpdateUseCase {
  static async execute({ payload }) {
    const data = await CantidadBeneficiariosRepository.update({ payload });
    if (!data) {
      const err = new Error('No se pudo encontrar el horario');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
