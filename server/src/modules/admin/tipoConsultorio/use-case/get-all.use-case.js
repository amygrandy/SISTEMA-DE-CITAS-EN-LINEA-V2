import { TipoConsultorioRepository } from '../tipoconsultorio.repository.js';

export class GetAllUseCase {
  static async execute() {
    const data = await TipoConsultorioRepository.getAll();
    return data;
  }
}
