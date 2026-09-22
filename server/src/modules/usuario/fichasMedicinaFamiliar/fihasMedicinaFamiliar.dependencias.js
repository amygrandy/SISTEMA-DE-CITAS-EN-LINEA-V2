import FichasMedicinaFalimiarRepository from './FichasMedicinaFamiliar.repository.js';
//
import GetFichasHistorialUseCase from './use-case/get-fichas-historial.use-case.js';
//
import FichasMedicinaFamiliarController from './fichasMedicinaFamiliar.controller.js';

const fichasMedicinaFalimiarRepository = new FichasMedicinaFalimiarRepository();

const getFichasHistorialUseCase = new GetFichasHistorialUseCase({
  fichasMedicinaFalimiarRepository,
});

const fichasMedicinaFamiliarController = new FichasMedicinaFamiliarController({
  getFichasHistorialUseCase,
});

export { fichasMedicinaFamiliarController };
