import { generateToken } from '../../../shared/services/JwtService.js';

class IniciarSesionUseCase {
  constructor({ authUsuarioRepository, rolRepository }) {
    this.authUsuarioRepository = authUsuarioRepository;
    this.rolRepository = rolRepository;
  }
  async execute(payload) {
    const { nombre_usuario, contrasenia } = payload;
    const data = await this.authUsuarioRepository.getPaciente({
      matricula: nombre_usuario,
    });

    if (!data) {
      const err = new Error('Credenciales incorrectas');
      err.statusCode = 409;
      throw err;
    }
    console.log('************');
    console.log(data);
    console.log('************');

    if (data.cedula_indentidad != contrasenia) {
      const err = new Error(
        'No se pudo validar sus datos de acces. por favor, dirjase al Servicio de Vigencia de Derechos para la revision de su informacion registrada',
      );
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

    return {
      usuario: { ...data, rol: rolPaciente.nombre_rol },
      token,
    };
  }
}

export default IniciarSesionUseCase;
