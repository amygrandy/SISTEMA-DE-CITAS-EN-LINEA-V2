import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import HistorialPaginado from '../components/HistorialPaginado';
import { HistorialServices } from '../historial.services';
import { toast } from 'react-toastify';

export default function HistorialPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const idPoblacion = state?.idpoblacion;

  // =========================================================
  // CARGAR HISTORIAL MÉDICO
  // =========================================================

  useEffect(() => {
    let ignorarRespuesta = false;

    const cargarHistorial = async () => {
      if (idPoblacion == null || idPoblacion === '') {
        setConsultas([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await HistorialServices.getHistoria({
          id: idPoblacion,
        });

        if (ignorarRespuesta) return;

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudo obtener el historial médico',
          );
        }

        setConsultas(Array.isArray(response.data) ? response.data : []);
      } catch (e) {
        if (ignorarRespuesta) return;

        const mensaje =
          e instanceof Error
            ? e.message
            : 'Algo salió mal, inténtelo más tarde';

        setConsultas([]);
        setError(mensaje);

        toast.error(mensaje);
      } finally {
        if (!ignorarRespuesta) {
          setLoading(false);
        }
      }
    };

    cargarHistorial();

    return () => {
      ignorarRespuesta = true;
    };
  }, [idPoblacion, refresh]);

  // =========================================================
  // VALIDAR INFORMACIÓN DEL PACIENTE
  // =========================================================

  if (idPoblacion == null || idPoblacion === '') {
    return (
      <main className="p-8 text-center text-slate-500">
        No se encontró la información del paciente.
        <button
          type="button"
          onClick={() => navigate('/paciente/', { replace: true })}
          className="ml-2 font-semibold text-[#005B57]"
        >
          Volver
        </button>
      </main>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* BOTÓN VOLVER */}
      <BotonVolver onClick={() => navigate('/paciente')}>
        Volver al paciente
      </BotonVolver>

      {/* ENCABEZADO */}
      <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#005B57]">
            {state?.nombre_completo || 'Paciente'}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Historial médico
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Fichas y atenciones médicas registradas.
          </p>
        </div>

        {/* INDICADOR DE CARGA */}
        {loading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-[#245249]">
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
            Cargando historial...
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="mt-8 space-y-4">
        {loading ? (
          <HistorialSkeleton />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50/50 px-6 py-10 text-center">
            <ExclamationCircleIcon className="mx-auto h-10 w-10 text-red-400" />

            <p className="mt-3 text-sm font-bold text-slate-700">
              No se pudo cargar el historial médico
            </p>

            <p className="mt-2 text-sm text-slate-500">{error}</p>

            <button
              type="button"
              onClick={() => setRefresh((current) => current + 1)}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#245249] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d433c]"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Reintentar
            </button>
          </div>
        ) : (
          <HistorialPaginado consultas={consultas} registrosPorPagina={5} />
        )}
      </div>
    </main>
  );
}

// =========================================================
// BOTÓN VOLVER
// =========================================================

function BotonVolver({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#005B57]"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      {children}
    </button>
  );
}

// =========================================================
// SKELETON DEL HISTORIAL
// =========================================================

function HistorialSkeleton() {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Cargando historial médico"
      aria-live="polite"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start gap-4">
            {/* ICONO */}
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-[#edf4f2]">
              <ClipboardDocumentListIcon className="h-6 w-6 text-[#245249]/30" />
            </div>

            {/* INFORMACIÓN */}
            <div className="min-w-0 flex-1">
              <div className="h-4 w-2/3 max-w-xs rounded-full bg-slate-200" />

              <div className="mt-3 h-3 w-1/2 max-w-48 rounded-full bg-slate-100" />

              <div className="mt-3 h-3 w-1/3 max-w-32 rounded-full bg-slate-100" />
            </div>

            {/* ESTADO */}
            <div className="hidden h-7 w-20 rounded-full bg-slate-100 sm:block" />
          </div>

          {/* DIVISOR */}
          <div className="my-5 border-t border-slate-100" />

          {/* INFORMACIÓN INFERIOR */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded bg-slate-100" />
              <div className="h-3 w-28 rounded-full bg-slate-100" />
            </div>

            <div className="h-9 w-28 rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}

      <span className="sr-only">
        Obteniendo información del historial médico...
      </span>
    </div>
  );
}
