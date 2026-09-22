export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  console.log(err);
  return res.status(status).json({
    ok: false,
    message: err.message || 'Error interno del servidor',
  });
}
