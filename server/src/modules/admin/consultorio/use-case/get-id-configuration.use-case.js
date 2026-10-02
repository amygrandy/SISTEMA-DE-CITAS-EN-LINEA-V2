import { ConsultorioRepository } from '../consultorio.repository.js';

export class GetConfigurationById {
  static async execute({ id }) {
    const data = await ConsultorioRepository.getConfiguarionById({ id });

    if (!data) {
      const err = new Error('No se encontro la configuracion');
      err.statusCode = 404;
      throw err;
    }
    const dataNorm = {
      cantidad_fichas_por_dia: data.cantidad_fichas_por_dia,
      dias_anticipacion: data.dias_anticipacion,
      dias_habilitados: data.dias.map((row) => row.id),
    };
    return dataNorm;
  }
}
