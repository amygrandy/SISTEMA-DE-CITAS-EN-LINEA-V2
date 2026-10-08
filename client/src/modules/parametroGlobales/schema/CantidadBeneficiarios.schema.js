import z from 'zod';
import { reqInteger } from '../../../validators/zod';

export const CantidadFichasAseguradoSchema = z.object({
  cantidad_ficha_por_asgurado: reqInteger({ label: 'Cantidad fichas' }),
  dias_espera_ficha: reqInteger({ label: 'Dias espera' }),
  tiempo_para_cancelar_ficha: reqInteger({ label: 'Tiempo espera' }),
});
