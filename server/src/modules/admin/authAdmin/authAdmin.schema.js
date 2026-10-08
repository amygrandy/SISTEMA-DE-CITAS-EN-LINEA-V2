import { z } from 'zod';
import { reqString } from '../../../shared/services/ZodServices.js';

export const loginSchema = z.object({
  nombre_usuario: reqString({
    field: 'El nombre de usuario',
    min: 3,
    max: 30,
    regexMessage: 'El nombre de usuario solo puede contener letras y números',
  }),

  contrasenia: reqString({
    field: 'La contraseña',
    min: 6,
    max: 100,
  }),
});
