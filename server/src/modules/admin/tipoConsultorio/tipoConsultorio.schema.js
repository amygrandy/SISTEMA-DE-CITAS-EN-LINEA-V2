import z from 'zod';
import {
  reqString,
  reqBoolean,
  reqInteger,
} from '../../../shared/services/ZodServices.js';

export const TipoConsultorioSchema = z.object({
  nombre_tipo: reqString({
    field: 'Nombre',
    regex: /^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/,
  }),
  estado: reqBoolean({ label: 'Estado' }),
});

export const TipoConsultorioUpdateSchema = TipoConsultorioSchema.partial();
