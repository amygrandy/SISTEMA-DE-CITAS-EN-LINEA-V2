class GetAseguradosUseCase {
  constructor({ aseguradoRepository }) {
    this.aseguradoRepository = aseguradoRepository;
  }

  async execute(payload) {
    const data = await this.aseguradoRepository.getAsegurados(payload);
    if (!data) {
      const err = new Error('No se encontraron asegurados');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}

export default GetAseguradosUseCase;
