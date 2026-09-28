import { api } from '../../../../services/api';
import { toServiceError } from '../../../../services/error';

export class BeneficiarioServices {
  static async getBeneficiarios() {
    try {
      const response = await api.get('/usuario/beneficiario');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
