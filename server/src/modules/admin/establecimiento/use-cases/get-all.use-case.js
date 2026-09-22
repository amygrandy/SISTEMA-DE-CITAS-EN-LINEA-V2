import { EstablecimientoRepository } from '../establecimiento.respository.js';

export class GetAllUseCase {
  static async execute() {
    const data = await EstablecimientoRepository.getAll();
    return data;
  }
}
