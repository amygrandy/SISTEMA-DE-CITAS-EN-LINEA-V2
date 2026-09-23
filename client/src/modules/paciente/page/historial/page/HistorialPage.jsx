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
  const persona = state?.persona;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const loadLoad = async () => {
        const response = await HistorialServices.getHistoria({
          id: persona.idpoblacion,
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

  if (!persona) {
    return (
      <main className="p-8 text-center text-slate-500">
        No se encontró la información del paciente.
        <button
          onClick={() => navigate('/paciente/familia', { replace: true })}
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
            {persona.nombre_completo}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Historial médico
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Fichas y atenciones médicas registradas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#005B57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004744]"
        >
          <CalendarDaysIcon className="h-5 w-5" />
          Nueva reserva
        </button>
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
