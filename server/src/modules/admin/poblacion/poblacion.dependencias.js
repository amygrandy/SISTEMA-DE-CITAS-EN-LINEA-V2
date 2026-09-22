import PoblacionRepository from './polacion.respository.js';
import RolRepository from '../roles/rol.respository.js';
//
import GetAseguradoTitularUseCase from './use-case/get-titular.use-case.js';
//
import PoblacionController from './poblacion.controller.js';

const poblacionRepository = new PoblacionRepository();
const rolRepository = new RolRepository();

const getAseguradoTitularUseCase = new GetAseguradoTitularUseCase({
  poblacionRepository,
  rolRepository,
});

const poblacionController = new PoblacionController({
  getAseguradoTitularUseCase: getAseguradoTitularUseCase,
});

export { poblacionController as controller };
