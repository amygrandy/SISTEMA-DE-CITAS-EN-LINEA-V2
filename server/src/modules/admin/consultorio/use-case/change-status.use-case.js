import { ConsultorioRepository } from '../consultorio.repository.js';

export class ChangeStatusUseCase {
  static async execute({ id }) {
    const data = await ConsultorioRepository.changeStatus({ id });
    if (!data) {
      const err = new Error('No se encontor el registro');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
