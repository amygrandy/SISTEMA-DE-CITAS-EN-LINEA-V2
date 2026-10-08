import { useNavigate, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import HistorialPaginado from '../components/HistorialPaginado';
import { HistorialServices } from '../historial.services';
import { toast } from 'react-toastify';

export default function HistorialPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [consultas, setConsutas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const loadLoad = async () => {
        const response = await HistorialServices.getHistoria({
          id: state.idpoblacion,
        });

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudo obtener el historial',
          );
        }
        setConsutas(Array.isArray(response.data) ? response.data : []);
      };
      loadLoad();
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo obtener el historial');
      } else {
        return toast.error(e.message || 'No se pudo obtener el historial');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              h-12 w-12
              animate-spin
              rounded-full
              border-4 border-slate-200
              border-t-[#064135]
            "
          />

          <div className="text-center">
            <p className="font-semibold text-slate-700">Cargando historial</p>

            <p className="mt-1 text-sm text-slate-500">
              Obteniendo información del asegurado...
            </p>
          </div>
        </div>
      </main>
    );
  }
  if (!state) {
    return (
      <main className="p-8 text-center text-slate-500">
        No se encontró la información del paciente.
        <button
          onClick={() => navigate('/paciente/', { replace: true })}
          className="ml-2 font-semibold text-[#005B57]"
        >
          Volver
        </button>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <BotonVolver
        onClick={() => {
          navigate('/paciente');
        }}
      >
        Volver al paciente
      </BotonVolver>

      <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#005B57]">
            {state.nombre_completo}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Historial médico
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Fichas y atenciones médicas registradas.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <HistorialPaginado consultas={consultas} registrosPorPagina={5} />
      </div>
    </main>
  );
}

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
