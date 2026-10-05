import { ControlInasistenciaRespository } from '../controlInasistencia.repository.js';

export class UpdateUseCase {
  static async execute({ payload }) {
    const data = await ControlInasistenciaRespository.update({ payload });
    if (!data) {
      const err = new Error('No se econtro el registro');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
