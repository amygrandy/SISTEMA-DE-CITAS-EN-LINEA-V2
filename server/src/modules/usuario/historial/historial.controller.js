import { HistorialUseCase } from './use-case/historal.use-case.js';

export class HistorialController {
  static async getHistorial(req, res) {
    const data = await HistorialUseCase.execute({
      id: req.validated.params.id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente el historial',
      data,
    });
  }
}
