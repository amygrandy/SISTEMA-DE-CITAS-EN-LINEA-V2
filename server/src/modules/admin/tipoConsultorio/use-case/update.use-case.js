import { TipoConsultorioRepository } from '../tipoconsultorio.repository.js';

export class UpdateUseCase {
  static async execute({ id, payload }) {
    const data = await TipoConsultorioRepository.update({ id, payload });
    if (!data) {
      const err = new Error('No se encontro el tipo de consultorio');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
