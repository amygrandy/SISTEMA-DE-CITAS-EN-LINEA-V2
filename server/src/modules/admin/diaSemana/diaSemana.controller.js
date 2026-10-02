import { GetSelectUseCase } from './use-case/get-select.use-case.js';

export class DiaSemanaController {
  static async getSelect(req, res) {
    const data = await GetSelectUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los dias de la semana',
      data,
    });
  }
}
