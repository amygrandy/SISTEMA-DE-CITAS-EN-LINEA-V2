import { getBenericiariosUseCase } from './use-case/get-beneficiarios.use-case.js';

export class BeneficiariosController {
  static async getBenericiarios(req, res) {
    const { matricula } = req.usuario;
    const data = await getBenericiariosUseCase.execute({ matricula });
    return res
      .status(200)
      .json({
        ok: true,
        message: 'Se obtuvo correctamente lo beneficiarios',
        data,
      });
  }
}
