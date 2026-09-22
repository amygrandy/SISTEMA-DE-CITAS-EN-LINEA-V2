import { generateToken } from '../../../../shared/services/JwtService.js';

class GetAseguradoTitularUseCase {
  constructor({ poblacionRepository, rolRepository }) {
    this.poblacionRepository = poblacionRepository;
    this.rolRepository = rolRepository;
  }

  async execute(payload) {
    const { nombre_usuario, contrasenia } = payload;
    const data = await this.poblacionRepository.getAseguradoComprobar({
      matricula: nombre_usuario,
    });
    if (!data) {
      const err = new Error('Credenciales incorrectas');
      err.statusCode = 404;
      throw err;
    }

    if (data.cedula_indentidad != contrasenia) {
      const err = new Error('Credenciales incorrectas');
      err.statusCode = 409;
      throw err;
    }

    const rolPaciente = await this.rolRepository.finByName('paciente');

    if (!rolPaciente) {
      const err = new Error('No se encontro el rol');
      err.statusCode = 404;
      throw err;
    }
    const token = generateToken({ matricula: nombre_usuario });

    return { usuario: { ...data, rol: [rolPaciente.nombre_rol] }, token };
  }
}
export default GetAseguradoTitularUseCase;
