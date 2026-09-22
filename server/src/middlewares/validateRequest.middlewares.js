import { z, ZodError } from 'zod';

export const validateRequest = ({
  paramsSchema = null,
  querySchema = null,
  bodySchema = null,
}) => {
  return async (req, res, next) => {
    try {
      const validated = {};

      if (paramsSchema) {
        validated.params = await paramsSchema.parseAsync(req.params);
      }

      if (querySchema) {
        validated.query = await querySchema.parseAsync(req.query);
      }

      if (bodySchema) {
        validated.body = await bodySchema.parseAsync(req.body);
      }

      req.validated = validated;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const detailedErrors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        console.log(detailedErrors);
        return res.status(400).json({
          ok: false,
          message: 'Errores de validación',
          errors: detailedErrors,
        });
      }

      return res.status(500).json({
        ok: false,
        message: 'Error interno al validar los datos',
      });
    }
  };
};

export const idParamSchema = z.object({
  id: z.coerce
    .number({
      invalid_type_error: 'El id debe ser un número',
    })
    .int('El id debe ser un número entero')
    .positive('El id debe ser mayor a 0'),
});
export const paginationQuerySchema = z.object({
  page: z.coerce
    .number()
    .int('La página debe ser un número entero')
    .positive('La página debe ser mayor a 0')
    .default(1),

  limit: z.coerce
    .number()
    .int('El límite debe ser un número entero')
    .positive('El límite debe ser mayor a 0')
    .max(100, 'El límite máximo es 100')
    .default(10),

  search: z
    .string()
    .trim()
    .max(100, 'La búsqueda no debe superar los 100 caracteres')
    .optional()
    .default(''),
  estado: z
    .enum(['true', 'false'], {
      message: 'El estado solo puede ser true o false',
    })
    .transform((value) => value === 'true')
    .optional(),
});

export const searchQuerySchema = z.object({
  search: z
    .string()
    .trim()
    .max(100, 'La búsqueda no debe superar los 100 caracteres')
    .optional()
    .default(''),
});
