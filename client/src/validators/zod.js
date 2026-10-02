import { z } from 'zod';

export const reqString = ({
  min = 1,
  max = 255,
  regex = null,
  required = true,
  field = 'campo',
} = {}) => {
  let schema = z
    .string({
      required_error: `${field} es obligatorio`,
      invalid_type_error: `${field} debe ser texto`,
    })
    .trim();

  if (min !== null) {
    schema = schema.min(min, `${field} debe tener al menos ${min} caracteres`);
  }

  if (max !== null) {
    schema = schema.max(max, `${field} no puede superar los ${max} caracteres`);
  }

  if (regex) {
    schema = schema.regex(regex, `${field} tiene un formato inválido`);
  }

  if (!required) {
    schema = schema.optional();
  }

  return schema;
};

export const reqBoolean = ({ label = 'Campo', required = true } = {}) => {
  let schema = z.boolean({
    message: `${label} debe ser un valor booleano`,
  });

  if (!required) {
    schema = schema.optional();
  }

  return schema;
};
export const reqInteger = ({
  label = 'Campo',
  min,
  max,
  positive = true,
  required = true,
} = {}) => {
  let schema = z.coerce
    .number({
      invalid_type_error: `${label} debe ser un número`,
    })
    .int(`${label} debe ser un número entero`);

  if (positive) {
    schema = schema.positive(`${label} debe ser mayor a 0`);
  }

  if (min !== undefined) {
    schema = schema.min(min, `${label} debe ser mayor o igual a ${min}`);
  }

  if (max !== undefined) {
    schema = schema.max(max, `${label} debe ser menor o igual a ${max}`);
  }

  if (!required) {
    schema = schema.optional().nullable();
  }

  return schema;
};
export const reqIntegerArray = ({
  label = 'Campo',
  required = true,
  min = 1,
  max,
  positive = true,
} = {}) => {
  let numberSchema = z
    .number({
      invalid_type_error: `${label} debe contener solo números`,
    })
    .int(`${label} debe contener solo números enteros`);

  if (positive) {
    numberSchema = numberSchema.positive(
      `${label} debe contener números mayores a 0`,
    );
  }

  let schema = z.array(numberSchema, {
    invalid_type_error: `${label} debe ser un arreglo`,
  });

  if (min !== undefined) {
    schema = schema.min(
      min,
      `${label} debe contener al menos ${min} elemento${min === 1 ? '' : 's'}`,
    );
  }

  if (max !== undefined) {
    schema = schema.max(max, `${label} debe contener máximo ${max} elementos`);
  }

  if (!required) {
    schema = schema.optional();
  }

  return schema;
};

export const reqHora = ({ label = 'Hora', required = true }) => {
  let schema = z
    .string({
      required_error: `${label} es obligatorio`,
      invalid_type_error: `${label} debe ser una hora válida`,
    })
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      `${label} debe tener el formato HH:mm`,
    );

  if (!required) {
    schema = schema.optional();
  }

  return schema;
};
