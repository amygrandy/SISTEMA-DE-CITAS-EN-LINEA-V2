import { PefilServices } from '../perfil.respository.js';

export class GetPefilAseguradoUseCase {
  static async execute({ poblacion_id }) {
    const data = await PefilServices.getPerfilAsegurado({ poblacion_id });
    if (!data) {
      const err = new Error('No se encontro al asgurado');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
