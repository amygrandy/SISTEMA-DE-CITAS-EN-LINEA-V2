import { ZonificacionConsultorioRepository } from '../ZonificacionConsultorio.repository.js';

export class GetAllUseCase {
  static async execute() {
    const data = await ZonificacionConsultorioRepository.getAll();
    return data;
  }
}
