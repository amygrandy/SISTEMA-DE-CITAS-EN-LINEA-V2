import { HorarioHabilitacionRespository } from '../horarioHabilitacion.repository.js';

export class GetById {
  static async execute() {
    const data = await HorarioHabilitacionRespository.getById();
    if (!data) {
      const err = new Error('No se encontro el horario');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
