import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ArrowRightIcon,
  Squares2X2Icon,
  XMarkIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import { EspecialidadServices } from '../services';

export default function EspecialidadesPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [especialidades, setEspecialidades] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let activo = true;

    const cargarEspecialidades = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await EspecialidadServices.getTiposEspecialidad();

        if (!activo) return;

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudieron cargar las especialidades',
          );
        }

        setEspecialidades(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (!activo) return;

        setError(
          error instanceof Error
            ? error.message
            : 'Ocurrió un error al cargar las especialidades',
        );
        setEspecialidades([]);
      } finally {
        if (activo) setLoading(false);
      }
    };

    cargarEspecialidades();

    return () => {
      activo = false;
    };
  }, [refresh]);

  const especialidadesFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase('es');

    return especialidades.filter((item) =>
      String(item.label ?? '')
        .toLocaleLowerCase('es')
        .includes(texto),
    );
  }, [especialidades, busqueda]);

  const seleccionarEspecialidad = (especialidad) => {
    console.log('Especialidad seleccionada:', especialidad);
    console.log('Datos del paciente:', state);

    // Aquí puedes implementar tu navegación:
    //
    navigate('/paciente/citas/especialidad', {
      state: {
        ...state,
        tipo_especialidad_id: especialidad.value,
        nombre_especialidad: especialidad.label,
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-8">
      {/* ENCABEZADO */}
      <section className="relative overflow-hidden rounded-3xl bg-[#245249] px-6 py-7 text-white shadow-sm sm:px-8 sm:py-9">
        {/* Decoración */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-45 border-white/5" />
        <div className="pointer-events-none absolute bottom-0 right-32 h-24 w-24 translate-y-1/2 rounded-full bg-white/5" />

        <div className="relative z-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-7 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Volver a servicios
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                <HeartIcon className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Especialidades médicas
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/80">
                  Encuentra la especialidad que necesitas y continúa con la
                  programación de tu consulta médica.
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm md:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <ClipboardDocumentListIcon className="h-6 w-6" />
              </div>

              <div>
                <p className="text-2xl font-bold leading-none">
                  {loading ? '—' : especialidades.length}
                </p>
                <p className="mt-1 text-xs text-emerald-100/80">
                  Especialidades
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUSCADOR */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-800">
              <MagnifyingGlassIcon className="h-5 w-5 text-[#245249]" />
              Buscar especialidad
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Busca por el nombre de la especialidad médica.
            </p>

            <div className="relative mt-4 max-w-2xl">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Ej. Cardiología, Traumatología..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-12 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#245249] focus:bg-white focus:ring-4 focus:ring-[#245249]/10"
              />

              {busqueda && (
                <button
                  type="button"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setBusqueda('')}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LISTADO */}
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Explora nuestras especialidades
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Selecciona una especialidad para continuar.
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100" />
                  <div className="h-6 w-16 rounded-full bg-slate-100" />
                </div>

                <div className="mt-6 h-5 w-2/3 rounded-lg bg-slate-100" />
                <div className="mt-3 h-3 w-full rounded-lg bg-slate-100" />
                <div className="mt-2 h-3 w-3/4 rounded-lg bg-slate-100" />

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <div className="h-4 w-36 rounded-lg bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* ERROR */
          <div className="rounded-3xl border border-red-100 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
              <ExclamationCircleIcon className="h-9 w-9 text-red-500" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-800">
              No pudimos cargar las especialidades
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRefresh((prev) => prev + 1)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#245249] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c4039]"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Volver a intentar
            </button>
          </div>
        ) : especialidadesFiltradas.length === 0 ? (
          /* SIN RESULTADOS */
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <MagnifyingGlassIcon className="h-8 w-8 text-slate-400" />
            </div>

            <h3 className="mt-5 font-bold text-slate-800">
              {busqueda
                ? 'No encontramos coincidencias'
                : 'No hay especialidades disponibles'}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {busqueda
                ? 'Prueba con otro nombre de especialidad.'
                : 'Actualmente no existen especialidades registradas.'}
            </p>

            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda('')}
                className="mt-5 text-sm font-bold text-[#245249] hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          /* TARJETAS */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {especialidadesFiltradas.map((especialidad) => (
              <button
                key={especialidad.value}
                type="button"
                onClick={() => seleccionarEspecialidad(especialidad)}
                className="group relative flex min-h-52.5 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8db4aa] hover:shadow-lg hover:shadow-[#245249]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245249]"
              >
                {/* Detalle decorativo */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#edf5f2] opacity-50 transition-transform duration-300 group-hover:scale-125" />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dceae5] bg-[#edf5f2] text-[#245249] transition-all duration-300 group-hover:bg-[#245249] group-hover:text-white">
                    <HeartIcon className="h-7 w-7" />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-all group-hover:border-[#245249] group-hover:bg-[#245249] group-hover:text-white">
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                <div className="relative mt-5 flex-1">
                  <h3 className="text-base font-bold leading-6 text-slate-800 transition group-hover:text-[#245249]">
                    {especialidad.label}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    Consulta médica especializada.
                  </p>
                </div>

                <div className="relative mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-[#245249]">
                  <SparklesIcon className="h-4 w-4" />
                  Seleccionar especialidad
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* INFORMACIÓN INFERIOR */}
      <section className="flex items-start gap-3 rounded-2xl border border-[#dceae5] bg-[#f5faf8] px-5 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#245249]">
          <CheckCircleIcon className="h-5 w-5" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#245249]">
            ¿Cómo solicitar tu cita?
          </h4>
          <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
            Elige la especialidad que necesitas. A continuación, podrás
            consultar las fechas y horarios disponibles según las condiciones de
            atención de tu establecimiento.
          </p>
        </div>
      </section>
    </div>
  );
}
