import { HorarioHabilitacionRespository } from '../horarioHabilitacion.repository.js';

export class GetAllUseCase {
  static async execute() {
    const data = await HorarioHabilitacionRespository.getAll();
    return data;
  }
}
