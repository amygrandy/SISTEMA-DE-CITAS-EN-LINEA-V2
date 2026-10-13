import { TipoConsultorioRepository } from '../tipoconsultorio.repository.js';

export class GetSelectUsuarioUseCase {
  static async execute() {
    const data = await TipoConsultorioRepository.getSelectUsuario();
    return data;
  }
}
