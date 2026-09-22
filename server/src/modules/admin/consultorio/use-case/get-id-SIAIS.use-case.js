import { ConsultorioRepository } from '../consultorio.repository.js';

export class GetIdSIAISUseCase {
  static async execute({ consultorio_id }) {
    const data = await ConsultorioRepository.getIdSIAIS({ consultorio_id });
    if (!data) {
      const err = new Error('No se encontro el consultorio');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
