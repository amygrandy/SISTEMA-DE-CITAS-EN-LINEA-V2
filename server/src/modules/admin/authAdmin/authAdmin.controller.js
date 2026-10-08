import { LoginUseCase } from './login.use-case.js';

export class AuthController {
  static async Login(req, res) {
    const data = await LoginUseCase.execute({ payload: req.validated.body });
    return res
      .status(200)
      .json({ ok: true, message: 'Inicio de sesion correcta', data });
  }
  static async getMe(req, res) {
    const data = req.usuario;
    return res.status(200).json({
      ok: true,
      message: 'Se inicio sesion correctamente',
      data,
    });
  }
}
