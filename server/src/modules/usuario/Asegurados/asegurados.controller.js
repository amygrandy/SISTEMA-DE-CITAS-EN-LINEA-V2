import { GetAseguradosUseCase } from './use-case/get-asegurados.use-case.js';
import { GetSelectPacientesUseCase } from './use-case/get-select-paciente.use-case.js';
export class AseguradoController {
  static async getAsegurados(req, res) {
    const usuario = req.usuario;
    const data = await GetAseguradosUseCase.execute({
      matricula: usuario.matricula,
    });

    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los asegurado',
      data,
    });
  }
  static async getSelect(req, res) {
    const usuario = req.usuario;

    const data = await GetSelectPacientesUseCase.execute({
      payload: { matricula: usuario.matricula },
    });

    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los asegurado',
      data,
    });
  }
}
