import z, { ZodLazy } from 'zod';
import { reqInteger } from '../../../shared/services/ZodServices.js';

export const cantidadBeneficiariosSchema = z.object({
  cantidad_ficha_por_asgurado: reqInteger({ label: 'Cantidad' }),
});
