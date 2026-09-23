import { HistorialRepository } from '../historial.repository.js';

export class HistorialUseCase {
  static async execute({ id }) {
    const data = await HistorialRepository.getHistorial({ id });
    return data;
  }
}
