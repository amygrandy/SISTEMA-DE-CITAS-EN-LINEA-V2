import { TipoConsultorioRepository } from '../tipoconsultorio.repository.js';

export class GetSelectUseCase {
  static async execute() {
    const data = await TipoConsultorioRepository.getSelect();
    return data;
  }
}
