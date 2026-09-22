import z from 'zod';
import {
  reqString,
  reqBoolean,
  reqInteger,
} from '../../../shared/services/ZodServices.js';

export const consultorioSchema = z.object({
  idCuaderno: reqInteger({ label: 'idCuaderno', positive: true, min: 1 }),
  fk_idestablecimiento: reqInteger({
    label: 'fk_idestablecimiento',
    positive: true,
    min: 1,
  }),
  tipo_consultorio_id: reqInteger({
    label: 'Tipo consultorio',
    positive: true,
    min: 1,
  }),
  nombre_consultorio: reqString({
    field: 'Nombre consultorio',
  }),
});

export const consultorioUpdateSchema = z.object({
  tipo_consultorio_id: reqInteger({
    label: 'Tipo consultorio',
    positive: true,
    min: 1,
  }),
});
