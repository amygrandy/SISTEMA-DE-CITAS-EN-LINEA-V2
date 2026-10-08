import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';
export class GetByIdUseCase {
  static async execute({ id }) {
    const data = await FichasMedicinaFalimiarRepository.getById({ id });
    if (!data) {
      const err = new Error('No se encontro la fichas');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
