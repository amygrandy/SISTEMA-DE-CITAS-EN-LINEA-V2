import { EstablecimientoRepository } from '../establecimiento.respository.js';

export class GetSelectUseCase {
  static async execute() {
    const data = await EstablecimientoRepository.getSelect();
    return data;
  }
}
