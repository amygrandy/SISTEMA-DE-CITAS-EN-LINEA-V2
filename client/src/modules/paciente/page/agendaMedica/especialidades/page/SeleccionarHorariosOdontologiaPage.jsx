import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { MedicianaFamiliarServices } from '../../services';
import { OdontologiaServices } from '../../odontologia.services';

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
import { imprimirFicha } from '../ficha.pdf';
import ConfirmModal from '../../../../../../components/ConfirmModal';

import { toast } from 'react-toastify';

const convertirUsuarioWeb = (nombre) => {
  if (!nombre) return '';

  const [primerNombre, primerApellido] = nombre
    .trim()
    .toLowerCase()
    .split(/\s+/);

  if (!primerApellido) {
    return `web/${primerNombre}`;
  }

  return `web/${primerNombre}.${primerApellido}`;
};

export default function SeleccionarFechaHora() {
  const { state } = useLocation();

  // =========================================================
  // ESTADOS
  // =========================================================

  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [dataOdontologia, setDataOdontologia] = useState(null);

  const [fechas, setFechas] = useState([]);
  const [horarios, setHorarios] = useState([]);

  // Loading separados
  const [loadingFechas, setLoadingFechas] = useState(true);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  //
  const [openModal, setOpenModal] = useState(false);

  // =========================================================
  // INFORMACIÓN RECIBIDA
  // =========================================================

  const asegurado = {
    nombreCompleto: state?.nombre_completo || '',
    ci: state?.cedula_identidad || '',
  };

  const establecimiento = {
    nombre: state?.establecieminto || '',
  };

  const consultorio = {
    nombre: dataOdontologia?.nombre_consultorio || '',
  };

  // =========================================================
  // CARGAR FECHAS DISPONIBLES
  // =========================================================

  useEffect(() => {
    const dataLoad = async () => {
      try {
        const response = await OdontologiaServices.getConsultorioOdontologia({
          id: state.idcuaderno,
        });
        // |
        if (!response.ok) {
          throw new Error(
            response.message ||
              'No tienes asignado un consultorio de odontolgia',
          );
        }
        setDataOdontologia(response.data);
      } catch (e) {
        toast.error(
          e instanceof Error
            ? `${e.message || 'No tienes asignado un consultorio de odontolgia'}`
            : 'Algo salio mal, intentelo mas tarde',
        );
      } finally {
      }
    };
    dataLoad();
  }, []);

  useEffect(() => {
    let ignorarRespuesta = false;

    const cargarFechas = async () => {
      try {
        setLoadingFechas(true);

        setFechas([]);
        setFechaSeleccionada(null);
        setHorarios([]);
        setHoraSeleccionada(null);

        const response = await MedicianaFamiliarServices.getFechaHabilitadas({
          idCuaderno: dataOdontologia.idCuaderno,
          idEstablecimiento: dataOdontologia.fk_idestablecimiento,
        });

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudo cargar las fechas disponibles',
          );
        }

        if (ignorarRespuesta) return;

        setFechas(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (ignorarRespuesta) return;

        setFechas([]);

        toast.error(
          error instanceof Error
            ? error.message
            : 'Algo salió mal, inténtelo más tarde',
        );
      } finally {
        if (!ignorarRespuesta) {
          setLoadingFechas(false);
        }
      }
    };

    cargarFechas();

    return () => {
      ignorarRespuesta = true;
    };
  }, [dataOdontologia]);

  // =========================================================
  // CARGAR HORARIOS CUANDO SE SELECCIONA UNA FECHA
  // =========================================================

  useEffect(() => {
    let ignorarRespuesta = false;

    const cargarHorarios = async () => {
      try {
        setLoadingHorarios(true);

        // Limpiamos horarios anteriores
        setHorarios([]);
        setHoraSeleccionada(null);

        const response =
          await MedicianaFamiliarServices.getHorariosByFechasByCuaderno({
            idCuaderno: dataOdontologia?.idCuaderno,
            idEstablecimiento: dataOdontologia?.fk_idestablecimiento,
            fecha: fechaSeleccionada?.fecha,
          });

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudo cargar los horarios disponibles',
          );
        }

        if (ignorarRespuesta) return;

        setHorarios(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (ignorarRespuesta) return;

        setHorarios([]);

        toast.error(
          error instanceof Error
            ? error.message
            : 'Algo salió mal, inténtelo más tarde',
        );
      } finally {
        if (!ignorarRespuesta) {
          setLoadingHorarios(false);
        }
      }
    };

    // Si no hay fecha seleccionada, no hacemos petición
    if (!fechaSeleccionada?.fecha) {
      setHorarios([]);
      setHoraSeleccionada(null);
      setLoadingHorarios(false);

      return () => {
        ignorarRespuesta = true;
      };
    }

    cargarHorarios();

    return () => {
      ignorarRespuesta = true;
    };
  }, [
    fechaSeleccionada?.fecha,
    dataOdontologia?.idCuaderno,
    dataOdontologia?.fk_idestablecimiento,
  ]);

  // =========================================================
  // SELECCIONAR FECHA
  // =========================================================

  const seleccionarFecha = (fecha) => {
    // Evitamos hacer otra petición si selecciona la misma fecha
    if (fechaSeleccionada?.fecha === fecha.fecha) {
      return;
    }

    setFechaSeleccionada(fecha);
    setHoraSeleccionada(null);
    setHorarios([]);
  };

  // =========================================================
  // OBTENER HORA PARA MOSTRAR
  // =========================================================

  const obtenerHora = (horario) => {
    if (!horario) return '';

    const valor = horario.hora ?? horario.fip_fecha_ini ?? '';

    if (typeof valor !== 'string') {
      return valor;
    }

    // Caso: 08:30:00
    if (/^\d{2}:\d{2}/.test(valor)) {
      return valor.slice(0, 5);
    }

    // Caso: 2026-10-06 08:30:00
    // o:   2026-10-06T08:30:00
    const coincidencia = valor.match(/(?:T|\s)(\d{2}:\d{2})/);

    if (coincidencia) {
      return coincidencia[1];
    }

    return valor;
  };

  // =========================================================
  // CONFIRMAR
  // =========================================================

  const confirmar = async () => {
    try {
      if (!fechaSeleccionada || !horaSeleccionada) {
        toast.warning('Debe seleccionar una fecha y un horario');
        return;
      }

      setLoadingSave(true);
      const data = {
        fecha: fechaSeleccionada.fecha,
        //
        fecha_ini: horaSeleccionada.fecha_ini,
        fecha_final: horaSeleccionada.fip_hora_fin,
        //
        cuaderno_id: dataOdontologia.idCuaderno,
        establecimiento_id: dataOdontologia?.fk_idestablecimiento,
        //
        poblacion_id: state.idpoblacion,

        idfichaprogramada: horaSeleccionada.idfichaprogramada,
        cedula_identidad: state.cedula_identidad,
        nombre_completo: state.nombre_completo,
        consultorio: dataOdontologia.nombre_consultorio,
        personal_id: horaSeleccionada.idpersonal,
        nombre_doctor: horaSeleccionada.nombre_personal_salud,
        establecieminto: state.establecieminto,
        idcobertura: state.idcobertura,
        //
        codigo: `${state.cua_sigla} ${horaSeleccionada.fip_numero}`,
      };

      console.log(data);
      const response = await MedicianaFamiliarServices.reservarFicha({
        payload: data,
      });
      if (!response.ok) {
        setOpenModal(false);
        throw new Error(response.message || 'No se pudo sacar la ficha');
      }

      const anio = new Date(fechaSeleccionada.fecha).getFullYear();

      imprimirFicha({
        consultorio: state.consultorio,
        direccion: horaSeleccionada.nombre_personal_salud,
        codigo: `${state.cua_sigla} ${horaSeleccionada.fip_numero}`,

        fechaAtencion: `${fechaSeleccionada.fecha} ${horaSeleccionada.fip_fecha_ini}`,
        // fechaAtencion: '10/09/2026 10:45:00',

        matricula: state.pac_codigo,
        paciente: state.nombre_completo,

        usuario: convertirUsuarioWeb(state.nombre_completo),

        fechaImpresion: '09/09/2026 12:03:03',
        año: anio,
      });
      setOpenModal(false);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? `${e.message || 'No se pudo sacar la ficha'}`
          : 'Algo salio mal, intentelo mas tarde',
      );
    } finally {
      setLoadingSave(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <div className="mx-auto w-full max-w-6xl space-y-5">
        {/* =====================================================
          HEADER
      ====================================================== */}

        <section
          className="
          overflow-hidden rounded-3xl
          border border-[#d6e3e0]
          bg-linear-to-r from-white via-white to-[#edf5f3]
          p-5 shadow-sm
          sm:p-6
        "
        >
          <div className="flex items-start gap-4">
            <div
              className="
              flex h-13 w-13 shrink-0
              items-center justify-center
              rounded-2xl bg-[#245249]
              text-white
            "
            >
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
                Los datos de atención ya fueron definidos. Selecciona únicamente
                la fecha y el horario disponible.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          DATOS DE LA CONSULTA
      ====================================================== */}

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
            {/* ASEGURADO */}

            <InfoCard icon={UserIcon} title="Asegurado" tone="emerald">
              <p className="wrap-break-word font-bold text-slate-800">
                {asegurado.nombreCompleto}
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <IdentificationIcon className="h-4 w-4 shrink-0" />

                <span>C.I. {asegurado.ci}</span>
              </div>
            </InfoCard>

            {/* ESTABLECIMIENTO */}

            <InfoCard
              icon={BuildingOffice2Icon}
              title="Establecimiento"
              tone="sky"
            >
              <p className="font-bold text-slate-800">
                {establecimiento.nombre}
              </p>
            </InfoCard>

            {/* CONSULTORIO */}

            <InfoCard icon={HeartIcon} title="Consultorio" tone="violet">
              <p className="font-bold text-slate-800">{consultorio.nombre}</p>

              {state?.tipo && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <CheckIcon className="h-4 w-4" />

                  {state.tipo}
                </div>
              )}
            </InfoCard>
          </div>
        </section>

        {/* =====================================================
          SELECCIÓN FECHA / HORA
      ====================================================== */}

        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* =================================================
            FECHA
        ================================================== */}

          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl bg-[#edf4f2]
                  text-[#245249]
                "
                >
                  <CalendarDaysIcon className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800">
                    1. Selecciona la fecha
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Selecciona uno de los días disponibles.
                  </p>
                </div>
              </div>

              {/* INDICADOR PEQUEÑO DE CARGA */}

              {loadingFechas && (
                <div className="hidden items-center gap-2 text-xs font-semibold text-[#4f7c73] sm:flex">
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  Cargando fechas
                </div>
              )}
            </div>

            {/* ===============================================
              LOADING FECHAS
          ================================================ */}

            {loadingFechas ? (
              <div
                className="
                mt-5 grid grid-cols-2 gap-3
                sm:grid-cols-3
                md:grid-cols-5
              "
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <FechaSkeleton key={index} />
                ))}
              </div>
            ) : fechas.length === 0 ? (
              /* =============================================
                SIN FECHAS
            ============================================== */

              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                <CalendarDaysIcon className="mx-auto h-9 w-9 text-slate-300" />

                <p className="mt-3 text-sm font-bold text-slate-600">
                  No hay fechas disponibles
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Actualmente no existen fechas habilitadas para este
                  consultorio.
                </p>
              </div>
            ) : (
              /* =============================================
                LISTADO DE FECHAS
            ============================================== */

              <div
                className="
                mt-5 grid grid-cols-2 gap-3
                sm:grid-cols-3
                md:grid-cols-5
              "
              >
                {fechas.map((fecha) => {
                  const seleccionado = fechaSeleccionada?.fecha === fecha.fecha;

                  return (
                    <button
                      key={fecha.id ?? fecha.fecha}
                      type="button"
                      disabled={!fecha.tiene_fichas || loadingHorarios}
                      onClick={() => seleccionarFecha(fecha)}
                      className={`
                      relative rounded-2xl border
                      px-4 py-4
                      text-center
                      transition-all duration-200

                      disabled:cursor-not-allowed
                      disabled:opacity-60

                      ${
                        seleccionado
                          ? `
                            border-[#245249]
                            bg-[#245249]
                            text-white
                            shadow-md
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-700

                            enabled:hover:-translate-y-0.5
                            enabled:hover:border-[#91b2aa]
                            enabled:hover:bg-[#f5faf8]
                          `
                      }
                    `}
                    >
                      {/* CHECK */}

                      {seleccionado && (
                        <div
                          className="
                          absolute right-2 top-2
                          flex h-5 w-5
                          items-center justify-center
                          rounded-full bg-white
                          text-[#245249]
                        "
                        >
                          <CheckIcon className="h-3.5 w-3.5" />
                        </div>
                      )}

                      {/* DÍA */}

                      <p
                        className={`
                        text-xs font-bold

                        ${seleccionado ? 'text-white/70' : 'text-slate-400'}
                      `}
                      >
                        {fecha.dia}
                      </p>

                      {/* NÚMERO */}

                      <p className="mt-1 text-2xl font-bold">{fecha.numero}</p>

                      {/* MES */}

                      <p
                        className={`
                        mt-1 text-xs font-semibold

                        ${seleccionado ? 'text-white/70' : 'text-slate-500'}
                      `}
                      >
                        {fecha.mes}
                      </p>

                      {/* SIN FICHAS */}

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

          {/* =================================================
            HORARIOS
        ================================================== */}

          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl bg-sky-50
                  text-sky-600
                "
                >
                  <ClockIcon className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800">
                    2. Selecciona la hora
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Selecciona uno de los horarios disponibles.
                  </p>
                </div>
              </div>

              {/* INDICADOR DE CARGA */}

              {loadingHorarios && (
                <div className="hidden items-center gap-2 text-xs font-semibold text-sky-600 sm:flex">
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  Cargando horarios
                </div>
              )}
            </div>

            {/* ===============================================
              TODAVÍA NO SELECCIONÓ FECHA
          ================================================ */}

            {!fechaSeleccionada ? (
              <div
                className="
                mt-5 rounded-2xl
                border border-dashed border-slate-300
                bg-slate-50
                px-6 py-10
                text-center
              "
              >
                <CalendarDaysIcon className="mx-auto h-8 w-8 text-slate-300" />

                <p className="mt-3 text-sm font-semibold text-slate-600">
                  Primero selecciona una fecha
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Los horarios disponibles aparecerán aquí.
                </p>
              </div>
            ) : loadingHorarios ? (
              /* =============================================
                LOADING HORARIOS
            ============================================== */

              <div>
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 sm:hidden">
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  Obteniendo horarios disponibles...
                </div>

                <div
                  className="
                  mt-5 grid grid-cols-2 gap-3
                  sm:grid-cols-3
                  md:grid-cols-4
                  lg:grid-cols-6
                "
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <HorarioSkeleton key={index} />
                  ))}
                </div>
              </div>
            ) : horarios.length === 0 ? (
              /* =============================================
                SIN HORARIOS
            ============================================== */

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
              /* =============================================
                LISTADO DE HORARIOS
            ============================================== */

              <div
                className="
                mt-5 grid grid-cols-2 gap-3
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
              "
              >
                {horarios.map((horario) => {
                  const seleccionado =
                    horaSeleccionada?.idfichaprogramada ===
                    horario.idfichaprogramada;

                  return (
                    <button
                      key={horario.idfichaprogramada}
                      type="button"
                      onClick={() => setHoraSeleccionada(horario)}
                      className={`
                      relative rounded-2xl border
                      px-4 py-4
                      text-center
                      transition-all duration-200

                      ${
                        seleccionado
                          ? `
                            border-[#245249]
                            bg-[#edf6f3]
                            text-[#245249]
                            shadow-[0_0_0_3px_rgba(36,82,73,0.08)]
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-700

                            hover:-translate-y-0.5
                            hover:border-[#91b2aa]
                            hover:bg-[#f5faf8]
                          `
                      }
                    `}
                    >
                      <ClockIcon
                        className={`
                        mx-auto h-5 w-5

                        ${seleccionado ? 'text-[#245249]' : 'text-slate-400'}
                      `}
                      />

                      <p className="mt-2 font-bold">{obtenerHora(horario)}</p>

                      {seleccionado && (
                        <div
                          className="
                          absolute right-2 top-2
                          flex h-5 w-5
                          items-center justify-center
                          rounded-full bg-[#245249]
                          text-white
                        "
                        >
                          <CheckIcon className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
          RESUMEN FINAL
      ====================================================== */}

        <section
          className="
          flex flex-col gap-4
          rounded-3xl border border-slate-200
          bg-white p-5 shadow-sm
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Ficha seleccionada
            </p>

            {fechaSeleccionada && horaSeleccionada ? (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-800">
                  {fechaSeleccionada.dia} {fechaSeleccionada.numero}{' '}
                  {fechaSeleccionada.mes}
                </span>

                <span className="text-slate-300">•</span>

                <span className="font-bold text-[#245249]">
                  {obtenerHora(horaSeleccionada)}
                </span>
              </div>
            ) : loadingHorarios ? (
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                Consultando horarios...
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                Selecciona fecha y hora para continuar.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            disabled={
              !fechaSeleccionada ||
              !horaSeleccionada ||
              loadingFechas ||
              loadingHorarios
            }
            className="
            inline-flex items-center justify-center gap-2
            rounded-2xl bg-[#245249]
            px-6 py-3.5
            text-sm font-bold text-white
            transition
            hover:bg-[#1d433c]

            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:text-slate-500
          "
          >
            {loadingHorarios ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                Cargando
              </>
            ) : (
              <>
                Confirmar cita
                <ArrowRightIcon className="h-5 w-5" />
              </>
            )}
          </button>
        </section>
      </div>
      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmar}
        type="cita"
        loading={loadingSave}
      />
    </>
  );
}

// =========================================================
// INFO CARD
// =========================================================

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
          className={`
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-xl
            ${tones[tone]}
          `}
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

// =========================================================
// SKELETON PARA FECHAS
// =========================================================

function FechaSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="mx-auto h-3 w-12 rounded-full bg-slate-200" />

      <div className="mx-auto mt-3 h-8 w-8 rounded-lg bg-slate-200" />

      <div className="mx-auto mt-3 h-3 w-14 rounded-full bg-slate-200" />
    </div>
  );
}

// =========================================================
// SKELETON PARA HORARIOS
// =========================================================

function HorarioSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="mx-auto h-5 w-5 rounded-full bg-slate-200" />

      <div className="mx-auto mt-3 h-4 w-14 rounded-full bg-slate-200" />
    </div>
  );
}
