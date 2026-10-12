import z from 'zod';
import {
  reqString,
  reqInteger,
  reqFecha,
  reqDateTimeUTC,
} from '../../../shared/services/ZodServices.js';

export const fichasMedicinaFamiliarSchema = z.object({
  matricula_codigo: reqString({
    field: 'La matrícula',
    min: 5,
    max: 20,
    regex: /^[A-Za-z0-9]+$/,
    regexMessage: 'La matrícula solo puede contener letras y números',
    required: true,
  }),
});

export const FechasCuadernoSchema = z.object({
  idCuaderno: reqInteger({ label: 'Cuaderno' }),
  idEstablecimiento: reqInteger({ label: 'Establecimiento' }),
});

export const HorariasCuadernoSchema = z.object({
  fecha: reqFecha({ label: 'Fecha' }),
  idCuaderno: reqInteger({ label: 'Cuaderno' }),
  idEstablecimiento: reqInteger({ label: 'Establecimiento' }),
});

export const reservarFichaSchema = z.object({
  fecha: reqFecha({ label: 'Fecha' }),
  fecha_ini: reqString({ field: 'Fecha ini' }),
  fecha_final: reqString({ field: 'Fecha final' }),
  cuaderno_id: reqInteger({ label: 'Cuaderno' }),
  establecimiento_id: reqInteger({ label: 'Establecimiento' }),
  poblacion_id: reqInteger({ label: 'Poblacion' }),
  idfichaprogramada: reqInteger({ label: 'id Fichas' }),
  cedula_identidad: reqString({ field: 'Cedula' }),
  nombre_completo: reqString({ field: 'Nombre completo' }),
  consultorio: reqString({ field: 'consultorio' }),
  personal_id: reqInteger({ label: 'Doctor' }),
  establecieminto: reqString({ field: 'Establecimiento' }),
  idcobertura: reqInteger({ label: 'Cobertura' }),
  nombre_doctor: reqString({ field: 'Nombre doctor' }),
  codigo: reqString({ field: 'Codigo' }),
  codigo_asegurado: reqString({ field: 'Codigo asegurado' }),
  //
  matricula: reqString({ field: 'Matricula' }),
  fechaAtencion: reqString({ field: 'Fecha atencion' }),
});

export const fichaByFechaSchema = z.object({
  fecha: reqFecha({ label: 'Fecha' }),
  poblacion_id: reqInteger({ label: 'poblacion_id' }),
});
