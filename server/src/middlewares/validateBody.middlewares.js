import { ZodError } from 'zod';
export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
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
