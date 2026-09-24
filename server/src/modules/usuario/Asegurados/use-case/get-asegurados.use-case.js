import { AseguradoRepository } from '../asegurado.repository.js';

export class GetAseguradosUseCase {
  static async execute(payload) {
    const data = await AseguradoRepository.getAsegurados(payload);
    if (!data) {
      const err = new Error('No se encontraron asegurados');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
