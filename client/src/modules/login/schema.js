import { z } from 'zod';
import { reqString } from '../../validators/zod';

export const loginSchema = z.object({
  nombre_usuario: reqString({
    field: 'La matrícula',
    min: 3,
    max: 30,
    regex: /^[A-Za-z0-9 ]+$/,
    regexMessage: 'La matrícula solo puede contener letras, números y espacios',
    required: true,
  }),

  contrasenia: reqString({
    field: 'La cédula de identidad',
    min: 5,
    max: 15,
    regex: /^[0-9]+$/,
    regexMessage: 'La cédula de identidad solo puede contener números',
    required: true,
  }),
});
