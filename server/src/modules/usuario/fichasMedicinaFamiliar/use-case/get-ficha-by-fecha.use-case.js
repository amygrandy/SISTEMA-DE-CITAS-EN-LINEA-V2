import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';

export class GetFichaByFechaUseCase {
  static async execute({ poblacion_id, fecha }) {
    const data = await FichasMedicinaFalimiarRepository.getFichaByFecha({
      fecha,
      poblacion_id,
    });
    return data;
  }
}
