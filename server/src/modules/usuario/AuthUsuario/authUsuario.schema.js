import { z } from 'zod';
import { reqString } from '../../../shared/services/ZodServices.js';

export const loginSchema = z.object({
  nombre_usuario: reqString({
    field: 'El nombre de usuario',
    min: 3,
    max: 30,
    regex: /^[A-Za-z0-9]+$/,
    regexMessage: 'El nombre de usuario solo puede contener letras y números',
    required: true,
  }),

  contrasenia: reqString({
    field: 'La contraseña',
    min: 6,
    max: 100,
    required: true,
  }),
});
