import z from 'zod';
import { reqString } from '../../../shared/services/ZodServices.js';

export const fichasMedicinaFamiliarSchema = z.object({
  matricula_codigo: reqString({
    field: 'La matrícula',
    min: 5,
    max: 20,
    regex: /^[A-Za-z0-9]+$/,
    regexMessage: 'La matrícula solo puede contener letras y números',
    required: true,
  }),
});
