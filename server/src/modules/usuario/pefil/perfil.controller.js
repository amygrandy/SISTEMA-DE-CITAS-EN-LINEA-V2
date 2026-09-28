import { GetPefilAseguradoUseCase } from './use-case/PefilAsegurado.use-case.js';

export class PerfilController {
  static async getPerfilAsegurado(req, res) {
    const { idpoblacion } = req.usuario;

    const data = await GetPefilAseguradoUseCase.execute({
      poblacion_id: idpoblacion,
    });

    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo el perfil del asegurado correctamente',
      data,
    });
  }
}
