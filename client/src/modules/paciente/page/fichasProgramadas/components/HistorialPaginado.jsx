import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export default function HistorialPaginado({
  consultas = [],
  registrosPorPagina = 5,
  loading = false,
  loadingFicha = false,
  verFicha = () => {},
  cancelarFicha = () => {},
}) {
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(consultas.length / registrosPorPagina);

  const consultasPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;

    return consultas.slice(inicio, fin);
  }, [consultas, paginaActual, registrosPorPagina]);

  useEffect(() => {
    setPaginaActual(1);
  }, [consultas]);

  const paginaAnterior = () => {
    setPaginaActual((pagina) => Math.max(pagina - 1, 1));
  };

  const paginaSiguiente = () => {
    setPaginaActual((pagina) => Math.min(pagina + 1, totalPaginas));
  };

  // ==========================
  // CARGANDO
  // ==========================
  if (loading) {
    return <HistorialLoading />;
  }

  // ==========================
  // SIN REGISTROS
  // ==========================
  if (!consultas.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <ClipboardDocumentListIcon className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 font-semibold text-slate-700">
          No hay consultas registradas
        </p>

        <p className="mt-1 text-sm text-slate-500">
          El paciente todavía no tiene historial disponible.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {consultasPaginadas.map((consulta, index) => (
          <HistorialCard
            key={`${consulta?.fecha}-${index}`}
            consulta={consulta}
            cancelarFicha={cancelarFicha}
            verFicha={verFicha}
            loadingFicha={loadingFicha}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500">
            Mostrando{' '}
            <span className="font-semibold text-slate-700">
              {(paginaActual - 1) * registrosPorPagina + 1}
            </span>{' '}
            -{' '}
            <span className="font-semibold text-slate-700">
              {Math.min(paginaActual * registrosPorPagina, consultas.length)}
            </span>{' '}
            de{' '}
            <span className="font-semibold text-slate-700">
              {consultas.length}
            </span>{' '}
            registros
          </div>

          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <button
              type="button"
              onClick={paginaAnterior}
              disabled={paginaActual === 1}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#005B57] hover:text-[#005B57] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            <div className="flex items-center gap-1">
              {Array.from(
                { length: totalPaginas },
                (_, index) => index + 1,
              ).map((pagina) => (
                <button
                  key={pagina}
                  type="button"
                  onClick={() => setPaginaActual(pagina)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                    paginaActual === pagina
                      ? 'bg-[#005B57] text-white'
                      : 'text-slate-600 hover:bg-[#EAF5F3] hover:text-[#005B57]'
                  }`}
                >
                  {pagina}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={paginaSiguiente}
              disabled={paginaActual === totalPaginas}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#005B57] hover:text-[#005B57] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HistorialCard({ consulta, verFicha, cancelarFicha, loadingFicha }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
            <ClipboardDocumentListIcon className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-bold text-slate-900">
                {consulta?.consultorio || 'Sin consultorio'}
              </h3>

              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {consulta?.estado_descripcion || 'Sin estado'}
              </span>
            </div>

            <p className="mt-1 wrap-break-word text-sm text-slate-500">
              {consulta?.nombre_medico || 'Sin médico registrado'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:min-w-125">
            <InfoHistorial
              icon={<CalendarDaysIcon className="h-5 w-5" />}
              label="Fecha"
              value={consulta?.fecha}
            />

            <InfoHistorial
              icon={<ClockIcon className="h-5 w-5" />}
              label="Hora"
              value={consulta?.hora}
            />

            <InfoHistorial
              icon={<MapPinIcon className="h-5 w-5" />}
              label="Establecimiento"
              value={consulta?.establecimiento}
            />
          </div>
        </div>

        {/* ACCIONES */}
        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => verFicha(consulta)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#005B57]/20 bg-[#F1F8F7] px-4 py-2.5 text-sm font-semibold text-[#005B57] transition hover:border-[#005B57]/40 hover:bg-[#EAF5F3]"
          >
            <EyeIcon className="h-5 w-5" />
            {loadingFicha ? 'Cargando...' : ' Ver ficha'}
          </button>

          <button
            type="button"
            onClick={() => cancelarFicha(consulta)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
          >
            <XCircleIcon className="h-5 w-5" />
            Cancelar ficha
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoHistorial({ icon, label, value }) {
  return (
    <div className="flex gap-2">
      <div className="mt-0.5 shrink-0 text-[#005B57]">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>

        <p className="wrap-break-word text-sm font-semibold text-slate-700">
          {value || 'No registrado'}
        </p>
      </div>
    </div>
  );
}

function HistorialLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

            <div className="flex-1">
              <div className="h-4 w-48 rounded bg-slate-200" />

              <div className="mt-3 h-3 w-64 max-w-full rounded bg-slate-100" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:min-w-125">
              {Array.from({ length: 3 }).map((_, item) => (
                <div key={item} className="flex gap-2">
                  <div className="h-5 w-5 rounded bg-slate-200" />

                  <div className="flex-1">
                    <div className="h-3 w-14 rounded bg-slate-200" />

                    <div className="mt-2 h-4 w-24 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
