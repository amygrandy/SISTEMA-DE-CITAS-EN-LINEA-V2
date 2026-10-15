import z from 'zod';
import {
  reqInteger,
  reqBoolean,
  reqEnum,
  reqFecha,
} from '../../../shared/services/ZodServices.js';
export const reporteSchema = z
  .object({
    establecimiento_id: reqInteger({
      label: 'Establecimiento',
    }),

    consultorio_id: reqInteger({
      label: 'Consultorio',
    }),

    fecha_inicial: reqFecha({
      label: 'Fecha inicial',
    }),

    fecha_final: reqFecha({
      label: 'Fecha final',
    }),

    estado: reqBoolean({
      label: 'Estado',
    }),

    tipo_cita: reqBoolean({
      label: 'Tipo cita',
    }),
  })
  .superRefine((data, ctx) => {
    const { fecha_inicial, fecha_final } = data;

    const inicio = new Date(`${fecha_inicial}T00:00:00Z`);
    const fin = new Date(`${fecha_final}T00:00:00Z`);

    if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime())) {
      return;
    }

    if (fin < inicio) {
      ctx.addIssue({
        code: 'custom',
        path: ['fecha_final'],
        message: 'La fecha final no puede ser anterior a la inicial.',
      });

      return;
    }

    if (!validarRangoMeses(fecha_inicial, fecha_final, 3)) {
      ctx.addIssue({
        code: 'custom',
        path: ['fecha_final'],
        message:
          'El rango máximo permitido para generar reportes es de 3 meses.',
      });
    }
  });

export const reporteEstablecimientoSchema = z
  .object({
    establecimiento_id: reqInteger({
      label: 'Establecimiento',
    }),

    fecha_inicial: reqFecha({
      label: 'Fecha inicial',
    }),

    fecha_final: reqFecha({
      label: 'Fecha final',
    }),

    estado: reqEnum({
      label: 'Estado',
      valores: ['ATENDIDOS', 'NO ATENDIDOS', 'AMBOS'],
    }),

    tipo_cita: reqBoolean({
      label: 'Tipo cita',
    }),
  })
  .superRefine((data, ctx) => {
    const { fecha_inicial, fecha_final } = data;

    const inicio = new Date(`${fecha_inicial}T00:00:00Z`);
    const fin = new Date(`${fecha_final}T00:00:00Z`);

    if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime())) {
      return;
    }

    if (fin < inicio) {
      ctx.addIssue({
        code: 'custom',
        path: ['fecha_final'],
        message: 'La fecha final no puede ser anterior a la inicial.',
      });

      return;
    }

    if (!validarRangoMeses(fecha_inicial, fecha_final, 3)) {
      ctx.addIssue({
        code: 'custom',
        path: ['fecha_final'],
        message:
          'El rango máximo permitido para generar reportes es de 3 meses.',
      });
    }
  });

export const validarRangoMeses = (fechaInicial, fechaFinal, meses = 3) => {
  if (!fechaInicial || !fechaFinal) return false;

  const inicio = new Date(`${fechaInicial}T00:00:00Z`);
  const fin = new Date(`${fechaFinal}T00:00:00Z`);

  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime())) {
    return false;
  }

  if (fin < inicio) return false;

  // Calcular fecha máxima sin alterar el día original
  const fechaMaxima = new Date(inicio);

  fechaMaxima.setUTCDate(1);
  fechaMaxima.setUTCMonth(fechaMaxima.getUTCMonth() + meses);

  // Ajustar al último día del mes si es necesario
  const ultimoDia = new Date(
    Date.UTC(fechaMaxima.getUTCFullYear(), fechaMaxima.getUTCMonth() + 1, 0),
  ).getUTCDate();

  fechaMaxima.setUTCDate(Math.min(inicio.getUTCDate(), ultimoDia));

  return fin <= fechaMaxima;
};
