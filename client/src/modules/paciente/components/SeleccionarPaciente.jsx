import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  XMarkIcon,
  UserGroupIcon,
  IdentificationIcon,
  HeartIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { FamiliarServices } from '../services/familiares.services';
import { toast } from 'react-toastify';

export default function SeleccionarPaciente({ open, onClose, onConfirm }) {
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [familiares, setFamiliares] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataLoad = async () => {
      try {
        if (!open) return;
        setLoading(true);
        const response = await FamiliarServices.getSelect();

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudo obtener los familiares',
          );
        }
        setFamiliares(Array.isArray(response.data) ? response.data : []);
      } catch (e) {
        if (e instanceof Error) {
          return toast.error(e || 'No se pudo obtener los familiares');
        } else {
          return toast.error('Algo salio mal, intentelo mas tarde');
        }
      } finally {
        setLoading(false);
      }
    };
    dataLoad();
  }, [open]);

  const seleccionarPaciente = (paciente) => {
    setPacienteSeleccionado(paciente);
  };

  const confirmar = () => {
    if (!pacienteSeleccionado) return;
    onConfirm?.(pacienteSeleccionado);
    onClose?.();
  };

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/50
        p-3 backdrop-blur-sm
        sm:p-5
      "
    >
      <div
        className="
          flex max-h-[92dvh] w-full max-w-5xl
          flex-col overflow-hidden
          rounded-3xl bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-center gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl bg-[#e7f0ee]
                text-[#245249]
                sm:h-14 sm:w-14
              "
            >
              <UserGroupIcon className="h-7 w-7" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-[#4f7c73]">
                Agenda médica
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-800 sm:text-2xl">
                Selecciona al paciente
              </h2>

              <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                Elige al titular o a uno de sus beneficiarios para solicitar la
                consulta médica.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-800
            "
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {/* TÍTULO */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-800">
                Pacientes disponibles
              </h3>

              <p className="mt-0.5 text-sm text-slate-500">
                {loading
                  ? 'Estamos consultando tus beneficiarios...'
                  : 'Selecciona una persona para continuar.'}
              </p>
            </div>

            {!loading && familiares.length > 0 && (
              <span className="rounded-full bg-[#edf4f2] px-3 py-1.5 text-xs font-bold text-[#245249]">
                {familiares.length} disponibles
              </span>
            )}
          </div>

          {/* CARGANDO */}
          {loading ? (
            <PacientesSkeleton />
          ) : familiares.length > 0 ? (
            /* PACIENTES */
            <div className="grid gap-4 md:grid-cols-2">
              {familiares.map((paciente) => {
                const seleccionado =
                  pacienteSeleccionado?.idpoblacion === paciente.idpoblacion;

                const iniciales = paciente.nombre_completo
                  .split(' ')
                  .slice(0, 2)
                  .map((palabra) => palabra[0])
                  .join('');

                return (
                  <button
                    key={paciente.idpoblacion}
                    type="button"
                    onClick={() => seleccionarPaciente(paciente)}
                    className={`
              group relative w-full
              rounded-2xl border
              p-4 text-left
              transition-all duration-200

              ${
                seleccionado
                  ? `
                    border-[#397366]
                    bg-[#edf6f3]
                    shadow-[0_0_0_3px_rgba(36,82,73,0.08)]
                  `
                  : `
                    border-slate-200
                    bg-white
                    hover:-translate-y-0.5
                    hover:border-[#abc6c0]
                    hover:shadow-md
                  `
              }
            `}
                  >
                    <div className="flex items-center gap-4">
                      {/* AVATAR */}
                      <div
                        className={`
                  flex h-14 w-14 shrink-0
                  items-center justify-center
                  rounded-2xl
                  text-base font-bold
                  transition-all duration-200

                  ${
                    seleccionado
                      ? 'bg-[#245249] text-white'
                      : `
                        bg-[#edf4f2]
                        text-[#245249]
                        group-hover:bg-[#dfece8]
                      `
                  }
                `}
                      >
                        {iniciales}
                      </div>

                      {/* INFORMACIÓN */}
                      <div className="min-w-0 flex-1">
                        <h4 className="wrap-break-word text-sm font-bold leading-5 text-slate-800 sm:text-base">
                          {paciente.nombre_completo}
                        </h4>

                        <div className="mt-2 flex items-center gap-2">
                          <IdentificationIcon
                            className={`
                      h-4 w-4 shrink-0
                      ${seleccionado ? 'text-[#397366]' : 'text-slate-400'}
                    `}
                          />

                          <span className="text-sm font-medium text-slate-500">
                            C.I. {paciente.cedula_identidad}
                          </span>
                        </div>
                      </div>

                      {/* CHECK */}
                      <div
                        className={`
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-full
                  transition-all duration-200

                  ${
                    seleccionado
                      ? 'scale-100 bg-[#245249] text-white'
                      : `
                        scale-95
                        border border-slate-200
                        bg-white
                        text-transparent
                        group-hover:border-[#abc6c0]
                      `
                  }
                `}
                      >
                        <CheckIcon className="h-5 w-5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* VACÍO */
            <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <UserGroupIcon className="h-7 w-7 text-slate-400" />
              </div>

              <h4 className="mt-4 font-bold text-slate-700">
                No tienes pacientes disponibles
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                No encontramos beneficiarios registrados para solicitar una
                consulta.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div
          className="
            flex shrink-0 flex-col-reverse gap-3
            border-t border-slate-200
            bg-slate-50/70
            px-5 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-7
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl border border-slate-300
              bg-white px-5 py-3
              text-sm font-semibold text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={confirmar}
            disabled={!pacienteSeleccionado}
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl bg-[#245249]
              px-6 py-3
              text-sm font-bold text-white
              transition
              hover:bg-[#1d433c]
              disabled:cursor-not-allowed
              disabled:bg-slate-300
              disabled:text-slate-500
            "
          >
            <HeartIcon className="h-5 w-5" />
            Continuar con paciente
          </button>
        </div>
      </div>
    </div>
  );
}

function PacientesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
            animate-pulse
            rounded-2xl border border-slate-200
            bg-white p-4
          "
        >
          <div className="flex items-center gap-4">
            {/* AVATAR */}
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-slate-200" />

            {/* DATOS */}
            <div className="min-w-0 flex-1">
              <div className="h-4 w-4/5 rounded-full bg-slate-200" />

              <div className="mt-3 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-slate-200" />

                <div className="h-3 w-28 rounded-full bg-slate-200" />
              </div>
            </div>

            {/* CHECK */}
            <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
