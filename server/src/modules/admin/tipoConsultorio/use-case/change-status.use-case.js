import { TipoConsultorioRepository } from '../tipoconsultorio.repository.js';

export class ChangeStatusUseCase {
  static async execute({ id }) {
    const data = await TipoConsultorioRepository.changeStatus({ id });
    if (!data) {
      const err = new Error('No se encontro el tipo de consultorio');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
