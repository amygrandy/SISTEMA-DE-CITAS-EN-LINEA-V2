import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  IdentificationIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ClockIcon,
  CheckIcon,
  ArrowRightIcon,
  HeartIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import { MedicianaFamiliarServices } from '../../services';
import { EspecialidadServices } from '../services';
import { imprimirFicha } from '../../especialidades/ficha.pdf';
import ConfirmModal from '../../../../../../components/ConfirmModal';

const convertirUsuarioWeb = (nombre = '') => {
  const [primerNombre, primerApellido] = nombre
    .trim()
    .toLowerCase()
    .split(/\s+/);
  if (!primerNombre) return '';
  return primerApellido
    ? `web/${primerNombre}.${primerApellido}`
    : `web/${primerNombre}`;
};

const obtenerHora = (horario) => {
  if (!horario) return '';
  const valor =
    horario.hora ?? horario.fip_fecha_ini ?? horario.fecha_ini ?? '';
  if (typeof valor !== 'string') return String(valor);
  if (/^\d{2}:\d{2}/.test(valor)) return valor.slice(0, 5);
  const coincidencia = valor.match(/(?:T|\s)(\d{2}:\d{2})/);
  return coincidencia?.[1] ?? valor;
};

const obtenerMensajeError = (error, alternativa) =>
  error instanceof Error ? error.message || alternativa : alternativa;

export default function OdontologiaPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [dataOdontologia, setDataOdontologia] = useState([]);
  const [selectOdontologia, setSelectOdontologia] = useState(null);
  const [fechas, setFechas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [tieneFichas, setTieneFichas] = useState(null);

  const [loadingConsultorios, setLoadingConsultorios] = useState(true);
  const [loadingFechas, setLoadingFechas] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [refreshDisponibilidad, setRefreshDisponibilidad] = useState(0);

  const asegurado = {
    nombreCompleto: state?.nombre_completo || '',
    ci: state?.cedula_identidad || '',
  };
  const establecimiento = { nombre: state?.establecieminto || '' };
  const consultorio = { nombre: selectOdontologia?.label || 'Por seleccionar' };

  // Cargar los consultorios habilitados del establecimiento.
  useEffect(() => {
    let activo = true;
    const cargarConsultorios = async () => {
      try {
        setLoadingConsultorios(true);
        if (!state?.idestablecimiento || !state?.tipo_especialidad_id) {
          throw new Error(
            'Faltan los datos del establecimiento o la especialidad',
          );
        }
        const response =
          await EspecialidadServices.getConsultorioByTipoByEstablecimiento({
            establecimiento_id: state.idestablecimiento,
            tipo_consultorio_id: state.tipo_especialidad_id,
          });
        if (!response.ok) {
          throw new Error(
            response.message || 'No hay consultorios de odontología asignados',
          );
        }
        if (activo)
          setDataOdontologia(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (activo) {
          setDataOdontologia([]);
          toast.error(
            obtenerMensajeError(
              error,
              'No se pudieron cargar los consultorios',
            ),
          );
        }
      } finally {
        if (activo) setLoadingConsultorios(false);
      }
    };
    cargarConsultorios();
    return () => {
      activo = false;
    };
  }, [state?.idestablecimiento, state?.tipo_especialidad_id]);

  // Cada consultorio tiene su propia disponibilidad.
  useEffect(() => {
    let activo = true;
    const cargarFechas = async () => {
      setFechas([]);
      setFechaSeleccionada(null);
      setHorarios([]);
      setHoraSeleccionada(null);
      setTieneFichas(null);
      if (!selectOdontologia) {
        setLoadingFechas(false);
        return;
      }
      try {
        setLoadingFechas(true);
        const response = await MedicianaFamiliarServices.getFechaHabilitadas({
          idCuaderno: selectOdontologia.value,
          idEstablecimiento: state?.idestablecimiento,
        });
        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudieron cargar las fechas disponibles',
          );
        }
        if (activo)
          setFechas(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (activo) {
          setFechas([]);
          toast.error(
            obtenerMensajeError(error, 'No se pudieron cargar las fechas'),
          );
        }
      } finally {
        if (activo) setLoadingFechas(false);
      }
    };
    cargarFechas();
    return () => {
      activo = false;
    };
  }, [
    selectOdontologia?.value,
    state?.idestablecimiento,
    refreshDisponibilidad,
  ]);

  // Verificar si el paciente ya tiene ficha y luego buscar los horarios.
  useEffect(() => {
    let activo = true;
    const cargarHorarios = async () => {
      setHorarios([]);
      setHoraSeleccionada(null);
      setTieneFichas(null);
      if (!fechaSeleccionada?.fecha || !selectOdontologia?.value) {
        setLoadingHorarios(false);
        return;
      }
      try {
        setLoadingHorarios(true);
        const fichasHoy = await MedicianaFamiliarServices.getFichaByFecha({
          payload: {
            poblacion_id: state?.idpoblacion,
            fecha: fechaSeleccionada.fecha,
          },
        });
        if (!activo) return;
        if (!fichasHoy.ok) {
          throw new Error(
            fichasHoy.message ||
              'No se pudo verificar si tienes una ficha programada',
          );
        }
        const existentes = Array.isArray(fichasHoy.data) ? fichasHoy.data : [];
        if (existentes.length > 0) {
          setTieneFichas(existentes);
          return;
        }
        const response =
          await MedicianaFamiliarServices.getHorariosByFechasByCuaderno({
            idCuaderno: selectOdontologia.value,
            idEstablecimiento: state?.idestablecimiento,
            fecha: fechaSeleccionada.fecha,
          });
        if (!activo) return;
        if (!response.ok) {
          throw new Error(
            response.message ||
              'No se pudieron cargar los horarios disponibles',
          );
        }
        setHorarios(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (activo) {
          setHorarios([]);
          toast.error(
            obtenerMensajeError(error, 'No se pudieron cargar los horarios'),
          );
        }
      } finally {
        if (activo) setLoadingHorarios(false);
      }
    };
    cargarHorarios();
    return () => {
      activo = false;
    };
  }, [
    fechaSeleccionada?.fecha,
    selectOdontologia?.value,
    state?.idestablecimiento,
    state?.idpoblacion,
  ]);

  const seleccionarConsultorio = (item) => {
    if (selectOdontologia?.value === item.value) return;
    setSelectOdontologia(item);
    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
    setFechas([]);
    setHorarios([]);
    setTieneFichas(null);
  };

  const seleccionarFecha = (fecha) => {
    if (loadingHorarios || fechaSeleccionada?.fecha === fecha.fecha) return;
    setFechaSeleccionada(fecha);
    setHoraSeleccionada(null);
    setHorarios([]);
    setTieneFichas(null);
  };

  const confirmar = async () => {
    if (loadingSave) return;
    if (!selectOdontologia || !fechaSeleccionada || !horaSeleccionada) {
      toast.warning('Debes seleccionar un consultorio, una fecha y un horario');
      return;
    }
    try {
      setLoadingSave(true);
      const data = {
        fecha: fechaSeleccionada.fecha,
        fecha_ini: horaSeleccionada.fecha_ini,
        fecha_final: horaSeleccionada.fip_hora_fin,
        cuaderno_id: selectOdontologia.value,
        establecimiento_id: state?.idestablecimiento,
        poblacion_id: state?.idpoblacion,
        idfichaprogramada: horaSeleccionada.idfichaprogramada,
        cedula_identidad: state?.cedula_identidad,
        nombre_completo: state?.nombre_completo,
        consultorio: selectOdontologia.label,
        personal_id: horaSeleccionada.idpersonal,
        nombre_doctor: horaSeleccionada.nombre_personal_salud,
        establecieminto: state?.establecieminto,
        idcobertura: state?.idcobertura,
        codigo:
          `${state?.cua_sigla ?? ''} ${horaSeleccionada.fip_numero ?? ''}`.trim(),
        codigo_asegurado: state?.codigo_asegurado,
        matricula: state?.pac_codigo,
        fechaAtencion: `${fechaSeleccionada.fecha} ${horaSeleccionada.fip_fecha_ini}`,
      };
      const response = await MedicianaFamiliarServices.reservarFicha({
        payload: data,
      });
      if (!response.ok)
        throw new Error(response.message || 'No se pudo reservar la ficha');

      setOpenModal(false);
      setRefreshDisponibilidad((actual) => actual + 1);
      toast.success('Ficha reservada correctamente');

      // La reserva ya fue guardada: un problema al imprimir no debe marcarla como fallida.
      try {
        imprimirFicha({
          consultorio: selectOdontologia.label,
          direccion: horaSeleccionada.nombre_personal_salud,
          codigo: data.codigo,
          fechaAtencion: data.fechaAtencion,
          matricula: state?.pac_codigo,
          paciente: state?.nombre_completo,
          usuario: convertirUsuarioWeb(state?.nombre_completo),
          fechaImpresion: new Date().toLocaleString('es-BO'),
          año: Number(fechaSeleccionada.fecha.slice(0, 4)),
        });
      } catch (error) {
        toast.warning(
          'La ficha se reservó, pero no se pudo generar su impresión',
        );
      }
    } catch (error) {
      setOpenModal(false);
      toast.error(obtenerMensajeError(error, 'No se pudo reservar la ficha'));
    } finally {
      setLoadingSave(false);
    }
  };

  const irProgramaciones = () => {
    navigate('/paciente/fichas-programadas', { state });
  };

  return (
    <>
      <div className="mx-auto w-full max-w-6xl space-y-5">
        {/* ENCABEZADO */}
        <section className="overflow-hidden rounded-3xl border border-[#d6e3e0] bg-linear-to-r from-white via-white to-[#edf5f3] p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#245249] text-white">
              <CalendarDaysIcon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#4f7c73]">
                Agenda médica
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                Programa tu consulta
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Selecciona el consultorio, la fecha y el horario disponible para
                tu atención.
              </p>
            </div>
          </div>
        </section>

        {/* DATOS DEL PACIENTE */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-800">
              Datos de la consulta
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Verifica la información antes de seleccionar tu ficha.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <InfoCard icon={UserIcon} title="Asegurado" tone="emerald">
              <p className="wrap-break-word font-bold text-slate-800">
                {asegurado.nombreCompleto}
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <IdentificationIcon className="h-4 w-4 shrink-0" />
                <span>C.I. {asegurado.ci}</span>
              </div>
            </InfoCard>
            <InfoCard
              icon={BuildingOffice2Icon}
              title="Establecimiento"
              tone="sky"
            >
              <p className="font-bold text-slate-800">
                {establecimiento.nombre}
              </p>
            </InfoCard>
            <InfoCard icon={HeartIcon} title="Consultorio" tone="violet">
              <p className="font-bold text-slate-800">{consultorio.nombre}</p>
              {state?.nombre_especialidad && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <CheckIcon className="h-4 w-4" />
                  {state.nombre_especialidad}
                </div>
              )}
            </InfoCard>
          </div>
        </section>

        {/* PASO 1: CONSULTORIOS EN TARJETAS */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf4f2] text-[#245249]">
                <BuildingOffice2Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">
                  1. Selecciona el consultorio
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Elige el consultorio donde deseas recibir atención.
                </p>
              </div>
            </div>
            {loadingConsultorios && (
              <LoadingLabel texto="Cargando consultorios" />
            )}
          </div>
          {loadingConsultorios ? (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <ConsultorioSkeleton key={index} />
              ))}
            </div>
          ) : dataOdontologia.length === 0 ? (
            <EmptyState
              icon={BuildingOffice2Icon}
              titulo="No hay consultorios disponibles"
              descripcion="Actualmente no existen consultorios habilitados para esta especialidad."
            />
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dataOdontologia.map((item) => {
                const seleccionado =
                  String(selectOdontologia?.value) === String(item.value);
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={seleccionado}
                    onClick={() => seleccionarConsultorio(item)}
                    className={`relative flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                      seleccionado
                        ? 'border-[#245249] bg-[#edf6f3] text-[#245249] shadow-[0_0_0_3px_rgba(36,82,73,0.08)]'
                        : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#91b2aa] hover:bg-[#f5faf8]'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${seleccionado ? 'bg-[#245249] text-white' : 'bg-slate-100 text-slate-400'}`}
                    >
                      <BuildingOffice2Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-400">
                        Consultorio
                      </p>
                      <p className="mt-1 wrap-break-word text-sm font-bold">
                        {item.label}
                      </p>
                    </div>
                    {seleccionado && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#245249] text-white">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* PASOS 2 Y 3 */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf4f2] text-[#245249]">
                  <CalendarDaysIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">
                    2. Selecciona la fecha
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Selecciona uno de los días disponibles.
                  </p>
                </div>
              </div>
              {loadingFechas && <LoadingLabel texto="Cargando fechas" />}
            </div>
            {!selectOdontologia ? (
              <EmptyState
                icon={BuildingOffice2Icon}
                titulo="Primero selecciona un consultorio"
                descripcion="Las fechas disponibles aparecerán aquí después de elegir un consultorio."
              />
            ) : loadingFechas ? (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FechaSkeleton key={index} />
                ))}
              </div>
            ) : fechas.length === 0 ? (
              <EmptyState
                icon={CalendarDaysIcon}
                titulo="No hay fechas disponibles"
                descripcion="Actualmente no existen fechas habilitadas para este consultorio."
              />
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {fechas.map((fecha) => {
                  const seleccionado = fechaSeleccionada?.fecha === fecha.fecha;
                  return (
                    <button
                      key={fecha.id ?? fecha.fecha}
                      type="button"
                      disabled={!fecha.tiene_fichas || loadingHorarios}
                      onClick={() => seleccionarFecha(fecha)}
                      aria-pressed={seleccionado}
                      className={`relative rounded-2xl border px-4 py-4 text-center transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                        seleccionado
                          ? 'border-[#245249] bg-[#245249] text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-700 enabled:hover:-translate-y-0.5 enabled:hover:border-[#91b2aa] enabled:hover:bg-[#f5faf8]'
                      }`}
                    >
                      {seleccionado && (
                        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#245249]">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <p
                        className={`text-xs font-bold ${seleccionado ? 'text-white/70' : 'text-slate-400'}`}
                      >
                        {fecha.dia}
                      </p>
                      <p className="mt-1 text-2xl font-bold">{fecha.numero}</p>
                      <p
                        className={`mt-1 text-xs font-semibold ${seleccionado ? 'text-white/70' : 'text-slate-500'}`}
                      >
                        {fecha.mes}
                      </p>
                      {!fecha.tiene_fichas && (
                        <p className="mt-2 text-[10px] font-bold text-red-500">
                          SIN FICHAS
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">
                    3. Selecciona la hora
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Selecciona uno de los horarios disponibles.
                  </p>
                </div>
              </div>
              {loadingHorarios && <LoadingLabel texto="Cargando horarios" />}
            </div>
            {!fechaSeleccionada ? (
              <EmptyState
                icon={CalendarDaysIcon}
                titulo="Primero selecciona una fecha"
                descripcion="Los horarios disponibles aparecerán aquí."
              />
            ) : loadingHorarios ? (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <HorarioSkeleton key={index} />
                ))}
              </div>
            ) : tieneFichas?.length > 0 ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
                <div className="flex items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <ClockIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-slate-800">
                        Ya tienes una ficha programada
                      </p>
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                        Reserva existente
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-slate-500">
                      Ya cuentas con una ficha registrada para esta fecha, por
                      lo que no es posible realizar otra reserva para el mismo
                      día.
                    </p>
                    <div className="mt-4 rounded-xl bg-[#f4f8f7] px-4 py-3">
                      <p className="text-xs font-semibold text-[#245249]">
                        Selecciona otra fecha disponible para continuar con tu
                        reserva.
                      </p>
                      <button
                        type="button"
                        onClick={irProgramaciones}
                        className="mt-5 rounded-2xl bg-emerald-800 p-3 text-white transition hover:bg-emerald-900"
                      >
                        Ir a fichas programadas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : horarios.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-amber-200 bg-amber-50/50 px-6 py-10 text-center">
                <ClockIcon className="mx-auto h-9 w-9 text-amber-400" />
                <p className="mt-3 text-sm font-bold text-slate-700">
                  No hay horarios disponibles
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  No existen fichas disponibles para la fecha seleccionada.
                </p>
                <p className="mt-2 text-xs font-semibold text-[#245249]">
                  Puedes seleccionar otra fecha.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {horarios.map((horario) => {
                  const seleccionado =
                    horaSeleccionada?.idfichaprogramada ===
                    horario.idfichaprogramada;
                  return (
                    <button
                      key={horario.idfichaprogramada}
                      type="button"
                      aria-pressed={seleccionado}
                      onClick={() => setHoraSeleccionada(horario)}
                      className={`relative rounded-2xl border px-4 py-4 text-center transition-all duration-200 ${
                        seleccionado
                          ? 'border-[#245249] bg-[#edf6f3] text-[#245249] shadow-[0_0_0_3px_rgba(36,82,73,0.08)]'
                          : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#91b2aa] hover:bg-[#f5faf8]'
                      }`}
                    >
                      <ClockIcon
                        className={`mx-auto h-5 w-5 ${seleccionado ? 'text-[#245249]' : 'text-slate-400'}`}
                      />
                      <p className="mt-2 font-bold">{obtenerHora(horario)}</p>
                      {seleccionado && (
                        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#245249] text-white">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* RESUMEN Y CONFIRMACIÓN */}
        <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Ficha seleccionada
            </p>
            {selectOdontologia && fechaSeleccionada && horaSeleccionada ? (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-800">
                  {selectOdontologia.label}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-slate-800">
                  {fechaSeleccionada.dia} {fechaSeleccionada.numero}{' '}
                  {fechaSeleccionada.mes}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-[#245249]">
                  {obtenerHora(horaSeleccionada)}
                </span>
              </div>
            ) : loadingFechas || loadingHorarios ? (
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                Consultando disponibilidad...
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                Selecciona consultorio, fecha y hora para continuar.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            disabled={
              !selectOdontologia ||
              !fechaSeleccionada ||
              !horaSeleccionada ||
              loadingConsultorios ||
              loadingFechas ||
              loadingHorarios ||
              loadingSave
            }
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#245249] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1d433c] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {loadingFechas || loadingHorarios || loadingSave ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                Cargando
              </>
            ) : (
              <>
                Confirmar cita <ArrowRightIcon className="h-5 w-5" />
              </>
            )}
          </button>
        </section>
      </div>
      <ConfirmModal
        open={openModal}
        onClose={() => !loadingSave && setOpenModal(false)}
        onConfirm={confirmar}
        type="cita"
        loading={loadingSave}
      />
    </>
  );
}

function InfoCard({ icon: Icon, title, tone = 'emerald', children }) {
  const tones = {
    emerald: 'bg-emerald-50 text-emerald-600',
    sky: 'bg-sky-50 text-sky-600',
    violet: 'bg-violet-50 text-violet-600',
  };
  return (
    <article className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            {title}
          </p>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </article>
  );
}

function LoadingLabel({ texto }) {
  return (
    <div className="hidden items-center gap-2 text-xs font-semibold text-[#4f7c73] sm:flex">
      <ArrowPathIcon className="h-4 w-4 animate-spin" />
      {texto}
    </div>
  );
}

function EmptyState({ icon: Icon, titulo, descripcion }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <Icon className="mx-auto h-9 w-9 text-slate-300" />
      <p className="mt-3 text-sm font-bold text-slate-600">{titulo}</p>
      <p className="mt-1 text-xs text-slate-400">{descripcion}</p>
    </div>
  );
}

function ConsultorioSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="h-11 w-11 rounded-xl bg-slate-200" />
      <div className="flex-1">
        <div className="h-3 w-20 rounded-full bg-slate-200" />
        <div className="mt-2 h-4 w-32 max-w-full rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function FechaSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="mx-auto h-3 w-12 rounded-full bg-slate-200" />
      <div className="mx-auto mt-3 h-8 w-8 rounded-lg bg-slate-200" />
      <div className="mx-auto mt-3 h-3 w-14 rounded-full bg-slate-200" />
    </div>
  );
}

function HorarioSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="mx-auto h-5 w-5 rounded-full bg-slate-200" />
      <div className="mx-auto mt-3 h-4 w-14 rounded-full bg-slate-200" />
    </div>
  );
}
