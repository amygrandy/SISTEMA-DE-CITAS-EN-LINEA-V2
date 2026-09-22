import { ZonificacionConsultorioRepository } from '../ZonificacionConsultorio.repository.js';

export class GetIdUseCase {
  static async execute({ id }) {
    const data = await ZonificacionConsultorioRepository.getId({ id });
    return data;
  }
}
