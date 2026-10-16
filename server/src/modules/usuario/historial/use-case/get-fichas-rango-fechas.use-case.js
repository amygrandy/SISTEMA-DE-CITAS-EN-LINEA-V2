import { HistorialRepository } from '../historial.repository.js';
import {
  formatearFechaQuitarGuines,
  aumentarUnDia,
  formatearFechaDos,
  separarFechaHora,
} from '../../../../shared/services/funciones.js';

export class GetFichasRangoFechasUseCase {
  static async execute({ matricula, fecha_ini }) {
    const data = await HistorialRepository.getFichasRangoFechas({
      matricula,
      fecha_ini: formatearFechaQuitarGuines(fecha_ini),
      fecha_final: aumentarUnDia(fecha_ini),
    });

    const dataNorm = data.map((row) => {
      const { fecha, hora } = separarFechaHora(row.fip_fecha_ini);

      return { ...row, fecha: formatearFechaDos(fecha), hora };
    });
    return dataNorm;
  }
}
