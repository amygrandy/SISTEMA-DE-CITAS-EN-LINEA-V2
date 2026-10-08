import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';
import {
  obtenerFechaHoy,
  separarFechaHora,
  formatearFechaDos,
} from '../../../../shared/services/funciones.js';

export class GetFichasProgramadasUseCase {
  static async execute({ id }) {
    const hoy = obtenerFechaHoy();
    const data = await FichasMedicinaFalimiarRepository.getFichasProgramadas({
      fecha: hoy,
      id,
    });

    const dataNorm = data.map((row) => {
      const { fecha, hora } = separarFechaHora(row.fip_fecha_ini);

      return { ...row, fecha: formatearFechaDos(fecha), hora };
    });

    return dataNorm;
  }
}
