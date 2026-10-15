import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ClipboardDocumentListIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import HistorialPaginado from '../components/HistorialPaginado';
import { FichasProgramadasServices as Services } from '../services';
import { toast } from 'react-toastify';
import { imprimirFicha } from '../../agendaMedica/especialidades/ficha.pdf';
import { formatearFechaHoraFicha } from '../../../../../utils/funciones';
import ConfirmModal from '../../../../../components/ConfirmModal';

// =========================================================
// CONVERTIR NOMBRE A USUARIO WEB
// =========================================================

const convertirUsuarioWeb = (nombre) => {
  if (!nombre) return '';

  const [primerNombre, primerApellido] = String(nombre)
    .trim()
    .toLowerCase()
    .split(/\s+/);

  if (!primerApellido) {
    return `web/${primerNombre}`;
  }

  return `web/${primerNombre}.${primerApellido}`;
};

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

export default function FichasProgramadasPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const idPoblacion = state?.idpoblacion;

  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loadingFicha, setLoadingFicha] = useState(false);

  const [refreshDisponibilidad, setRefreshDisponibilidad] = useState(0);

  // CANCELACIÓN DE FICHAS
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [openModalRemove, setOpenModalRemove] = useState(false);
  const [dataRemove, setDataRemove] = useState(null);

  const cancelandoRef = useRef(false);

  // =========================================================
  // CARGAR FICHAS PROGRAMADAS
  // =========================================================

  useEffect(() => {
    let ignorarRespuesta = false;

    const cargarFichas = async () => {
      if (idPoblacion == null || idPoblacion === '') {
        setConsultas([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await Services.getFichasProgramadas({
          id: idPoblacion,
        });

        if (ignorarRespuesta) return;

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudieron obtener las fichas programadas',
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

    cargarFichas();

    return () => {
      ignorarRespuesta = true;
    };
  }, [idPoblacion, refreshDisponibilidad]);

  // =========================================================
  // IMPRIMIR FICHA
  // =========================================================

  const handleFicha = async (data) => {
    if (loadingFicha || !data) return;

    try {
      setLoadingFicha(true);

      const anio = Number(String(data.fecha).slice(0, 4));

      await imprimirFicha({
        consultorio: data.consultorio,
        direccion: data.nombre_medico,
        codigo: `${data.cua_sigla} ${data.fip_numero}`,

        fechaAtencion: `${data.fecha} ${data.hora}`,

        matricula: state?.pac_codigo,
        paciente: state?.nombre_completo,

        usuario: convertirUsuarioWeb(state?.nombre_completo),

        fechaImpresion: formatearFechaHoraFicha(data.cit_fecha_reserva),
        año: anio,
      });
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'Algo salió mal, inténtelo más tarde',
      );
    } finally {
      setLoadingFicha(false);
    }
  };

  // =========================================================
  // ABRIR MODAL DE CANCELACIÓN
  // =========================================================

  const botonRemove = (data) => {
    if (loadingRemove || !data?.idfichaprogramada) return;

    setDataRemove(data);
    setOpenModalRemove(true);
  };

  // =========================================================
  // CERRAR MODAL
  // =========================================================

  const cerrarModalRemove = () => {
    if (loadingRemove) return;

    setOpenModalRemove(false);
    setDataRemove(null);
  };

  // =========================================================
  // CANCELAR FICHA
  // =========================================================

  const handleRemoveFicha = async () => {
    if (cancelandoRef.current || !dataRemove?.idfichaprogramada) {
      return;
    }

    cancelandoRef.current = true;

    try {
      setLoadingRemove(true);

      const response = await Services.removeFichaProgramada({
        id: dataRemove.idfichaprogramada,
      });

      if (!response.ok) {
        throw new Error(response.message || 'No se pudo cancelar la ficha');
      }

      setOpenModalRemove(false);
      setDataRemove(null);

      toast.success('Ficha cancelada correctamente');

      // RECARGAR LISTADO
      setRefreshDisponibilidad((current) => current + 1);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'Algo salió mal, inténtelo más tarde',
      );
    } finally {
      cancelandoRef.current = false;
      setLoadingRemove(false);
    }
  };

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
    <>
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
              Programaciones realizadas
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fichas y atenciones médicas registradas.
            </p>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#245249]">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Cargando fichas...
            </div>
          )}
        </div>

        {/* LISTADO DE FICHAS */}
        <div className="mt-8 space-y-4">
          {loading ? (
            <FichasProgramadasSkeleton />
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50/50 px-6 py-10 text-center">
              <ExclamationCircleIcon className="mx-auto h-10 w-10 text-red-400" />

              <p className="mt-3 text-sm font-bold text-slate-700">
                No se pudieron cargar las fichas programadas
              </p>

              <p className="mt-2 text-sm text-slate-500">{error}</p>

              <button
                type="button"
                onClick={() =>
                  setRefreshDisponibilidad((current) => current + 1)
                }
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#245249] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d433c]"
              >
                <ArrowPathIcon className="h-4 w-4" />
                Reintentar
              </button>
            </div>
          ) : (
            <HistorialPaginado
              consultas={consultas}
              verFicha={handleFicha}
              registrosPorPagina={5}
              loading={loading}
              loadingFicha={loadingFicha}
              cancelarFicha={botonRemove}
            />
          )}
        </div>
      </main>

      {/* MODAL DE CANCELACIÓN */}
      <ConfirmModal
        loading={loadingRemove}
        onClose={cerrarModalRemove}
        onConfirm={handleRemoveFicha}
        open={openModalRemove}
        type="cancelarFichaProgramada"
      />
    </>
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
// SKELETON DE FICHAS PROGRAMADAS
// =========================================================

function FichasProgramadasSkeleton() {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Cargando fichas programadas"
      aria-live="polite"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          {/* INFORMACIÓN PRINCIPAL */}
          <div className="flex items-start gap-4">
            {/* ICONO */}
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-[#edf4f2]">
              <ClipboardDocumentListIcon className="h-6 w-6 text-[#245249]/30" />
            </div>

            {/* DATOS */}
            <div className="min-w-0 flex-1">
              <div className="h-4 w-2/3 max-w-xs rounded-full bg-slate-200" />

              <div className="mt-3 h-3 w-1/2 max-w-48 rounded-full bg-slate-100" />

              <div className="mt-3 h-3 w-1/3 max-w-32 rounded-full bg-slate-100" />
            </div>

            {/* ESTADO */}
            <div className="hidden h-7 w-20 rounded-full bg-slate-100 sm:block" />
          </div>

          {/* SEPARADOR */}
          <div className="my-5 border-t border-slate-100" />

          {/* DATOS INFERIORES */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded bg-slate-100" />
              <div className="h-3 w-28 rounded-full bg-slate-100" />
            </div>

            {/* BOTONES */}
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-xl bg-slate-200" />
              <div className="h-9 w-24 rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      ))}

      <span className="sr-only">
        Obteniendo información de las fichas programadas...
      </span>
    </div>
  );
}
