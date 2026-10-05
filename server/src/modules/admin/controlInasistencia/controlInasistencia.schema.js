import z from 'zod';
import { reqInteger } from '../../../shared/services/ZodServices.js';

export const ControlInasistenciaSchema = z.object({
  cantidad_inasistencia: reqInteger({ label: 'Inasistencia' }),
  rango_dias: reqInteger({ label: 'Rango dias' }),
  sancion_dias: reqInteger({ label: 'Sancion dias' }),
});
