import { api } from '../../../../services/api';
import { toServiceError } from '../../../../services/error';

export class FichasProgramadasServices {
  static async getFichasProgramadas({ id }) {
    try {
      const response = await api.get(
        `/usuario/fichas-medicina-familiar/fichas-programadas/${id}`,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getByIdFichaProgramada({ id }) {
    try {
      const response = await api.get(
        `/usuario/fichas-medicina-familiar/obtener-ficha/${id}`,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }

  static async removeFichaProgramada({ id }) {
    try {
      const response = await api.post(
        `/usuario/fichas-medicina-familiar/remove-ficha/${id}`,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
