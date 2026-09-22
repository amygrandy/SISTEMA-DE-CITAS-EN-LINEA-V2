class AuthUsuarioController {
  constructor({ iniciarSesionUseCase }) {
    this.iniciarSesionUseCase = iniciarSesionUseCase;
  }
  async IniciarSesion(req, res) {
    const data = await this.iniciarSesionUseCase.execute(req.body);
    return res.status(200).json({
      ok: true,
      message: 'Se inicio sesion correctamente',
      data,
    });
  }
  async getMe(req, res) {
    const data = req.usuario;
    return res.status(200).json({
      ok: true,
      message: 'Se inicio sesion correctamente',
      data,
    });
  }
}

export default AuthUsuarioController;
