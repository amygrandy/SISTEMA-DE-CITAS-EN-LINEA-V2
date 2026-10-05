import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';
export class GetFichasHistorialUseCase {
  static async execute(payload) {
    const data = FichasMedicinaFalimiarRepository.getFichasHistorial(payload);
    if (!data) {
      const err = new Error('No se encontro el historial medico');
      err.statusCode = 404;
      throw err;
    }

    return data;
  }
}
