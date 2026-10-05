import { GetById } from './use-case/get-id.use-case.js';
import { UpdateUseCase } from './use-case/update.use-case.js';

export class ControlInasistenciaController {
  static async getById(req, res) {
    const data = await GetById.execute();
    return res
      .status(200)
      .json({ ok: true, message: 'Se obtuvo correctamente el registro', data });
  }
  static async update(req, res) {
    const data = await UpdateUseCase.execute({ payload: req.validated.body });
    return res.status(200).json({
      ok: true,
      message: 'Se actualizo correctamente el registro',
      data,
    });
  }
}
