import { CantidadBeneficiariosRepository } from '../cantidadBenecifiarios.respository.js';

export class getByIdUseCase {
  static async execute() {
    const data = await CantidadBeneficiariosRepository.getById();
    if (!data) {
      const err = new Error('No se encontro el registro');
      err.statuCode = 404;
      throw err;
    }
    return data;
  }
}
