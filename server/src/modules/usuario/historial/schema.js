import z from 'zod';
import { reqFecha } from '../../../shared/services/ZodServices.js';

export const RangoFechasSchema = z.object({
  fecha_ini: reqFecha({ label: 'Fecha inicial' }),
});
