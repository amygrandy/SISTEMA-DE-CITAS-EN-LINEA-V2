import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';

export class RemoveFichasUseCase {
  static async execute({ id, payload }) {
    const data = await FichasMedicinaFalimiarRepository.removerFicha({
      idfichaprogramada: id,
      paciente: payload,
    });
    if (!data) {
      const err = new Error('No se pudo eliminar la ficha');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
