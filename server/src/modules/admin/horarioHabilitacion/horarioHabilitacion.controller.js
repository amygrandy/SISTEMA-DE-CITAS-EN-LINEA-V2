import { GetAllUseCase } from './use-case/get-all.use-case.js';
import { UpdateUseCase } from './use-case/update.use-case.js';

export class HorarioHabilitacionController {
  static async getAll(req, res) {
    const data = await GetAllUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamene el hoario',
      data,
    });
  }
  static async update(req, res) {
    const data = await UpdateUseCase.execute({
      id: req.validated.params.id,
      payload: req.validated.body,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamene el hoario',
      data,
    });
  }
}
