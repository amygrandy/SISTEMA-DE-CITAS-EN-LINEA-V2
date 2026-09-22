import { TipoConsultorioRepository } from '../tipoconsultorio.repository.js';

export class CreateUseCase {
  static async execute({ payload }) {
    const buscarNombre = await TipoConsultorioRepository.getByName({
      nombre_tipo: payload.nombre_tipo,
    });
    if (buscarNombre) {
      const err = new Error('Ya existe un registro con ese nombre');
      err.statusCode = 409;
      throw err;
    }
    const data = await TipoConsultorioRepository.create({ payload });
    return data;
  }
}
