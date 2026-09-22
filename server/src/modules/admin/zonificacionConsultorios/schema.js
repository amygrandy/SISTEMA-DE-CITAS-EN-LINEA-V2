import z from 'zod';
import {
  reqInteger,
  reqIntegerArray,
} from '../../../shared/services/ZodServices.js';

export const ZonificacionSchema = z.object({
  consultorio_asignado_id: reqInteger({ label: 'Consultorio asignado' }),
  consultorioCabecera: reqIntegerArray({ label: 'Consultorio cabecera' }),
});

export const ZonificacionUpdateSchema = z.object({
  consultorioCabecera: reqIntegerArray({ label: 'Consultorios' }),
});
