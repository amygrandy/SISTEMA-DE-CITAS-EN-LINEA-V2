import { getByIdUseCase } from './use-case/get-id.use-case.js';
import { UpdateUseCase } from './use-case/update.use-case.js';

export class cantidadBenecificiariosController {
  static async getById(req, res) {
    console.log('llega aca');
    const data = await getByIdUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamene la cantidad de beneficiarios',
      data,
    });
  }
  static async update(req, res) {
    const data = await UpdateUseCase.execute({
      payload: req.validated.body,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamene la cantidad de beneficiarios',
      data,
    });
  }
}
