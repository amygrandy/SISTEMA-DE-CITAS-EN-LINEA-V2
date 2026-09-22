class FichasMedicinaFamiliarController {
  constructor({ getFichasHistorialUseCase }) {
    this.getFichasHistorialUseCase = getFichasHistorialUseCase;
  }
  async getFichasLibres(req, res) {
    const data = await this.getFichasHistorialUseCase.execute(req.body);
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo el historial correctamente',
      data,
    });
  }
}

export default FichasMedicinaFamiliarController;
