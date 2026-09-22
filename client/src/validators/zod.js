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
    schema = schema.min(min, `${field} debe tener al menos ${min} caracteres `);
  }

  if (max !== null) {
    schema = schema.max(
      max,
      `${field} no puede superar los ${max} caracteres `,
    );
  }

  if (regex) {
    schema = schema.regex(regex, `${field} tiene un formato inválido `);
  }

  if (!required) {
    schema = schema.optional();
  }

  return schema;
};
export const reqBoolean = ({ label = 'Campo', required = true } = {}) => {
  let schema = z.boolean({
    message: `Selecione una opcion`,
  });

  if (!required) {
    schema = schema.optional();
  }

  return schema;
};
