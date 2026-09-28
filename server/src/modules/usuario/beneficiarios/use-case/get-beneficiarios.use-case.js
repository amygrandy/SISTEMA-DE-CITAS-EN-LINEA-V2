import { BeneficiarioService } from '../beneficiario.respository.js';

export class getBenericiariosUseCase {
  static async execute({ matricula }) {
    const data = await BeneficiarioService.getBenericiarios({ matricula });

    return data;
  }
}
