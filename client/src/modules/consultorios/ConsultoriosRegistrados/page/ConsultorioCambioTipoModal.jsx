import { useMemo, useState, useEffect } from 'react';
import {
  XMarkIcon,
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  CheckIcon,
  ChevronRightIcon,
  UserGroupIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { ConsultorioServices as services } from '../services';
import ConfirmModal from '../../../../components/ConfirmModal';

export default function ConsultorioCambioTipoModal({
  open,
  onClose,
  tipo_consultorio,
  id,
  onTable,
}) {
  const [tipoConsultorioId, setTipoConsultorioId] = useState(null);
  const [dataTipoConsulotorio, setDataTipoConsultorio] = useState([]);
  const [loadingTipoConsultorio, setLoadingTipoConsultorio] = useState(false);

  //
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataLoad = async () => {
      try {
        setLoadingTipoConsultorio(true);
        if (!open) return;

        const response = await services.getSelecTipoConsultorio();
        setDataTipoConsultorio(
          Array.isArray(response.data) ? response.data : [],
        );
        if (Array.isArray(response.data) && tipo_consultorio) {
          const data = response.data.find(
            (item) => item.label == tipo_consultorio,
          );

          setTipoConsultorioId(data.value);
        }
      } catch (e) {
        if (e instanceof Error) {
          return toast.error(e.message || 'No se pudo cargar los datos');
        } else {
          return toast.error('Algo salio mal intentelo mas tarde');
        }
      } finally {
        setLoadingTipoConsultorio(false);
      }
    };
    dataLoad();
  }, [open]);

  const handleClose = () => {
    setTipoConsultorioId(null);
    setDataTipoConsultorio([]);
    onClose();
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await services.changeTipoConsultorio({
        id: id,
        payload: {
          tipo_consultorio_id: tipoConsultorioId,
        },
      });
      if (!response.ok) {
        throw new Error(response.message || 'No se pudo cambiar el estado');
      }
      setTipoConsultorioId(null);
      setDataTipoConsultorio([]);
      setOpenModal(false);
      onClose();
      onTable();
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo cambiar el estado');
      } else {
        return toast.error('Algo salio mal intentelo mas tarde');
      }
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
        <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-start justify-between border-b border-slate-200 px-7 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <BuildingOffice2Icon className="h-7 w-7 text-emerald-800" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  CAMBIAR DE TIPO DE CONSULTORIO
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="grid flex-1 gap-7 overflow-y-auto px-7 py-7 lg:grid-cols-1">
            <section>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  Seleccione el tipo de consultorio
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Indique el tipo de atención que necesita.
                </p>
              </div>

              <div className="mt-4 max-h-105 overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200">
                {loadingTipoConsultorio ? (
                  <div className="flex min-h-40 flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-700" />

                    <p className="text-sm font-medium text-slate-500">
                      Cargando tipos de consultorio...
                    </p>
                  </div>
                ) : dataTipoConsulotorio?.length > 0 ? (
                  dataTipoConsulotorio.map((tipo) => {
                    const selected = tipoConsultorioId === tipo.value;

                    return (
                      <button
                        key={tipo.value}
                        type="button"
                        onClick={() => setTipoConsultorioId(tipo.value)}
                        className={`flex w-full items-center gap-4 border-b border-slate-100 p-5 text-left transition last:border-b-0 ${
                          selected ? 'bg-emerald-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            selected
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <UserGroupIcon className="h-6 w-6" />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">
                            {tipo.label}
                          </p>
                        </div>

                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            selected
                              ? 'border-emerald-800 bg-emerald-800'
                              : 'border-slate-300'
                          }`}
                        >
                          {selected && (
                            <CheckIcon className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="flex min-h-40 items-center justify-center">
                    <p className="text-sm text-slate-500">
                      No hay tipos de consultorio disponibles.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
          {/* FOOTER */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-7 py-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              CANCELAR
            </button>

            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              GUARDAR
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        loading={loading}
        onClose={() => setOpenModal(false)}
        onConfirm={handleSave}
        open={openModal}
        type="editar"
      />
    </>
  );
}
