import { ControlInasistenciaRespository } from '../controlInasistencia.repository.js';

export class GetById {
  static async execute() {
    const data = await ControlInasistenciaRespository.getById();
    if (!data) {
      const err = new Error('No se econtro el registro');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
