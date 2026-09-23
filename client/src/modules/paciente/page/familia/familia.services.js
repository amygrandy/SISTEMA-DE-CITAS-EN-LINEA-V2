import { api } from '../../../../services/api';
import { toServiceError } from '../../../../services/error';

export class FamiliaServices {
  static async getFamiliaAsegurados() {
    try {
      const response = await api.get('/usuario/asegurados');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
