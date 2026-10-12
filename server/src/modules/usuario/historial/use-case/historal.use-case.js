import { HistorialRepository } from '../historial.repository.js';
import { obtenerFechaHoy } from '../../../../shared/services/funciones.js';

export class HistorialUseCase {
  static async execute({ id }) {
    const hoy = obtenerFechaHoy();
    const data = await HistorialRepository.getHistorial({ id, fecha: hoy });

    const dataNorm = data.map((row) => {
      const { fecha, hora } = separarFechaHora(row.fip_fecha_ini);

      return { ...row, fecha: formatearFecha(fecha), hora };
    });

    return dataNorm;
  }
}

const separarFechaHora = (valor) => {
  if (!valor) {
    return {
      fecha: null,
      hora: null,
    };
  }

  const fechaISO = valor instanceof Date ? valor.toISOString() : String(valor);

  const [fecha, tiempo] = fechaISO.split('T');

  return {
    fecha,
    hora: tiempo.slice(0, 5),
  };
};

const formatearFecha = (valor) => {
  if (!valor) return '';

  const fecha = valor instanceof Date ? valor : new Date(valor);

  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  return `${fecha.getUTCDate()} de ${
    meses[fecha.getUTCMonth()]
  } del ${fecha.getUTCFullYear()}`;
};
