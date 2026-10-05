import z from 'zod';
import { reqString, reqInteger } from '../../../shared/services/ZodServices.js';

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

export const FechasCuadernoSchema = z.object({
  idCuaderno: reqInteger({ label: 'Cuaderno' }),
  idEstablecimiento: reqInteger({ label: 'Establecimiento' }),
});
