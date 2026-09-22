class GetFichasHistorialUseCase {
  constructor({ fichasMedicinaFalimiarRepository }) {
    this.fichasMedicinaFalimiarRepository = fichasMedicinaFalimiarRepository;
  }
  async execute(payload) {
    const data =
      await this.fichasMedicinaFalimiarRepository.getFichasHistorial(payload);
    if (!data) {
      const err = new Error('No se encontro el historial medico');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}

export default GetFichasHistorialUseCase;
