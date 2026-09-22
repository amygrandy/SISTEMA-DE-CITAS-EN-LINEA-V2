import { EstablecimientoRepository } from '../establecimiento.respository.js';

export class GetAllSIAISUseCase {
  static async execute() {
    const data = await EstablecimientoRepository.getAllSIAIS();
    return data;
  }
}
