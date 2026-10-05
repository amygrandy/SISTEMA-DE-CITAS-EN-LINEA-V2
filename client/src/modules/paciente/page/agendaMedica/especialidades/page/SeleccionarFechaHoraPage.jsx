import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MedicianaFamiliarServices } from '../../services';
import {
  UserIcon,
  IdentificationIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckIcon,
  ArrowRightIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

export default function SeleccionarFechaHora() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fechas, setFechas] = useState([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    try {
      setLoading(true);
      const dataLoad = async () => {
        const response = await MedicianaFamiliarServices.getFechaHabilitadas({
          idCuaderno: state.idcuaderno,
          idEstablecimiento: state.idestablecimiento,
        });
        if (!response.ok) {
          throw new Error(response.message || 'No se pudo cargar las fechas');
        }
        setFechas(Array.isArray(response.data) ? response.data : []);
      };
      dataLoad();
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo cargar las fechas');
      } else {
        return toast.error('Algo salio mal, intentelo mas tarde');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const asegurado = {
    nombreCompleto: state?.nombre_completo || '',
    ci: state?.cedula_identidad || '',
  };

  const establecimiento = {
    nombre: state.establecieminto || '',
  };

  const consultorio = {
    nombre: state.consultorio || '',
  };

  const horarios = useMemo(() => {
    if (!fechaSeleccionada) return [];

    return [
      {
        id: 1,
        hora: '08:00',
        disponible: true,
      },
      {
        id: 2,
        hora: '08:30',
        disponible: true,
      },
      {
        id: 3,
        hora: '09:00',
        disponible: false,
      },
      {
        id: 4,
        hora: '09:30',
        disponible: true,
      },
      {
        id: 5,
        hora: '10:00',
        disponible: true,
      },
      {
        id: 6,
        hora: '10:30',
        disponible: false,
      },
      {
        id: 7,
        hora: '11:00',
        disponible: true,
      },
      {
        id: 8,
        hora: '11:30',
        disponible: true,
      },
    ];
  }, [fechaSeleccionada]);

  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setHoraSeleccionada(null);
  };

  const confirmar = () => {
    if (!fechaSeleccionada || !horaSeleccionada) return;

    console.log({
      asegurado,
      establecimiento,
      consultorio,
      fecha: fechaSeleccionada.fecha,
      hora: horaSeleccionada.hora,
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      {/* HEADER */}
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

      {/* RESUMEN */}
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
            <p className="font-bold text-slate-800">{establecimiento.nombre}</p>
          </InfoCard>

          {/* CONSULTORIO */}
          <InfoCard icon={HeartIcon} title="Consultorio" tone="violet">
            <p className="font-bold text-slate-800">{consultorio.nombre}</p>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <CheckIcon className="h-4 w-4" />
              {state?.tipo}
            </div>
          </InfoCard>
        </div>
      </section>

      {/* SELECCIÓN */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* FECHA */}
        <div className="border-b border-slate-200 p-5 sm:p-6">
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

          <div
            className="
              mt-5 grid grid-cols-2 gap-3
              sm:grid-cols-3
              md:grid-cols-5
            "
          >
            {fechas.map((fecha) => {
              const seleccionado = fechaSeleccionada?.id === fecha.id;

              return (
                <button
                  key={fecha.id}
                  disabled={!fecha.tiene_fichas}
                  type="button"
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

                  <p
                    className={`
                    text-xs font-bold
                    ${seleccionado ? 'text-white/70' : 'text-slate-400'}
                  `}
                  >
                    {fecha.dia}
                  </p>

                  <p className="mt-1 text-2xl font-bold">{fecha.numero}</p>

                  <p
                    className={`
                    mt-1 text-xs font-semibold
                    ${seleccionado ? 'text-white/70' : 'text-slate-500'}
                  `}
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
        </div>

        {/* HORA */}
        <div className="p-5 sm:p-6">
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
                Los horarios ocupados no pueden seleccionarse.
              </p>
            </div>
          </div>

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
          ) : (
            <div
              className="
                mt-5 grid grid-cols-2 gap-3
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
              "
            >
              {horarios.map((horario) => {
                const seleccionado = horaSeleccionada?.id === horario.id;

                return (
                  <button
                    key={horario.id}
                    type="button"
                    disabled={!horario.disponible}
                    onClick={() =>
                      horario.disponible && setHoraSeleccionada(horario)
                    }
                    className={`
                      relative rounded-2xl border
                      px-4 py-4
                      text-center
                      transition-all duration-200

                      ${
                        !horario.disponible
                          ? `
                            cursor-not-allowed
                            border-slate-100
                            bg-slate-100
                            text-slate-400
                            opacity-60
                          `
                          : seleccionado
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

                    <p className="mt-2 font-bold">{horario.hora}</p>

                    <p
                      className={`
                        mt-1 text-[11px] font-semibold
                        ${
                          horario.disponible
                            ? 'text-emerald-600'
                            : 'text-slate-400'
                        }
                      `}
                    >
                      {horario.disponible ? 'Disponible' : 'Ocupado'}
                    </p>

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

      {/* RESUMEN FINAL */}
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
                {horaSeleccionada.hora}
              </span>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Selecciona fecha y hora para continuar.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={confirmar}
          disabled={!fechaSeleccionada || !horaSeleccionada}
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
          Confirmar cita
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </section>
    </div>
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
