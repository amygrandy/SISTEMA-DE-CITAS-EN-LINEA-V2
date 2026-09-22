class GetRolNameUseCase {
  constructor(rolRespository) {
    this.rolRespository = rolRespository;
  }
  async execute(nombre_rol) {
    const data = await this.rolRespository.finByName(nombre_rol);
    if (!data) {
      const error = new Error('No se encontro el rol');
      error.statusCode = 404;
      throw error;
    }
    return data;
  }
}

export default GetRolNameUseCase;
