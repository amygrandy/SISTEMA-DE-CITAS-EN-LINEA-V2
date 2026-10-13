import { reqInteger } from '../../../shared/services/ZodServices.js';
import z from 'zod';

export const EspecialidadSchema = z.object({
  establecimiento_id: reqInteger({ label: 'Establecimiento' }),
  tipo_consultorio_id: reqInteger({ label: 'Tipo consultorio' }),
});
