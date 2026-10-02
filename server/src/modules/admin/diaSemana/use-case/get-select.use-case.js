import { DiaSemanaRepository } from '../diaSemana.respository.js';

export class GetSelectUseCase {
  static async execute() {
    const data = await DiaSemanaRepository.getSelect();
    return data;
  }
}
