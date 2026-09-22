export const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      req.params = schema.parse(req.params);

      next();
    } catch (error) {
      next(error);
    }
  };
};