import z from 'zod';
import { reqHora } from '../../../shared/services/ZodServices.js';

export const HorarioHabilitacionSchema = z
  .object({
    hora_inicio: reqHora({
      label: 'Hora inicio',
    }),

    hora_final: reqHora({
      label: 'Hora final',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.hora_inicio >= data.hora_final) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['hora_final'],
        message: 'La hora final debe ser mayor a la hora de inicio',
      });
    }
  });
