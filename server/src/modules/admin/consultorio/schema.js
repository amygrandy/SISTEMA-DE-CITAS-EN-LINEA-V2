import z from 'zod';
import {
  reqString,
  reqBoolean,
  reqInteger,
  reqHora,
  reqIntegerArray,
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

  dias_anticipacion: reqInteger({ label: 'Dias anticipacion' }),
  cantidad_fichas_por_dia: reqInteger({ label: 'Cantidad fichas' }),

  dias_habilitados: reqIntegerArray({ label: 'Dias habilitado' }),
});

export const consultorioTipoConsultorioUpdateSchema = z.object({
  tipo_consultorio_id: reqInteger({
    label: 'Tipo consultorio',
    positive: true,
    min: 1,
  }),
});

export const consultorioConfiguarionSchema = z.object({
  cantidad_fichas_por_dia: reqInteger({
    label: 'Cantidad fichas',
    required: false,
  }),
  dias_anticipacion: reqInteger({
    label: 'Dias anticipacion',
    required: false,
  }),

  dias_habilitados: reqIntegerArray({
    label: 'Dias habilitado',
    required: false,
  }),
});

export const consultorioUpdateSchema = z.object({
  cantidad_fichas_por_dia: reqInteger({
    label: 'Cantidad fichas',
    required: false,
  }),
  dias_anticipacion: reqInteger({
    label: 'Dias anticipacion',
    required: false,
  }),
  dias_habilitados: reqIntegerArray({
    label: 'Dias habilitado',
    required: false,
  }),
});
