import z, { ZodLazy } from 'zod';
import { reqInteger } from '../../../shared/services/ZodServices.js';

export const cantidadBeneficiariosSchema = z.object({
  cantidad_ficha_por_asgurado: reqInteger({ label: 'Cantidad' }),
  dias_espera_ficha: reqInteger({ label: 'Dias espera' }),
  tiempo_para_cancelar_ficha: reqInteger({ label: 'Tiempo espera' }),
});
