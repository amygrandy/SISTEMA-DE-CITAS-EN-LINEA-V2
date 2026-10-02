import { useMemo, useState, useEffect } from 'react';
import {
  XMarkIcon,
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  CheckIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import { ConsultorioServices } from '../services';
import { toast } from 'react-toastify';
import ConfirmModal from '../../../../components/ConfirmModal';
import SelectableList from '../../../../components/SelectableList';
import ConfiguracionFichasModal from '../components/ConfiguracionFichasModal';
import { MODALS, useModalManager } from '../../../../hooks/useModalManager';

export default function ModalSeleccionConsultorio({ open, onClose, onTable }) {
  const { closeModal, isModalOpen, modalState, openModal } = useModalManager();

  const [establecimientoId, setEstablecimientoId] = useState(null);
  const [consultorioId, setConsultorioId] = useState(null);
  const [tipoConsultorioId, setTipoConsultorioId] = useState(null);
  const [configuracion, setConfiguracion] = useState(null);
  //
  const [dataEstablecimiento, setDataEstablecimiento] = useState([]);
  const [loadingEstablecimiento, setLoadingEstablecimiento] = useState(false);
  //
  const [dataCosutorio, setDataConsultorio] = useState([]);
  const [loadingConsultorio, setLoadingConsultorio] = useState(false);
  //
  const [dataTipoConsulotorio, setDataTipoConsultorio] = useState([]);
  const [loadingTipoConsultorio, setLoadingTipoConsultorio] = useState(false);
  //

  const [loading, setLoading] = useState(false);
  //

  const seleccionarEstablecimiento = (id) => {
    setEstablecimientoId(id);
    setTipoConsultorioId(null);
    setConsultorioId(null);
    setDataConsultorio([]);
    setDataTipoConsultorio([]);
  };

  const seleccionarConsultorio = (id) => {
    setConsultorioId(id);
    setTipoConsultorioId(null);
  };

  const continuar = async () => {
    try {
      setLoading(true);

      const consultoriosFiltrados = dataCosutorio.find(
        (item) => item.value === consultorioId,
      );
      const data = {
        fk_idestablecimiento: establecimientoId,
        tipo_consultorio_id: tipoConsultorioId,
        idCuaderno: consultoriosFiltrados.value,
        nombre_consultorio: consultoriosFiltrados.label,
        ...configuracion,
      };

      const response = await ConsultorioServices.create(data);

      if (!response.ok) {
        throw new Error(response.message || ' No se pudo crear');
      }
      toast.success(response.message || ' se creo correctametne');
      setDataEstablecimiento([]);
      setDataConsultorio([]);
      setDataTipoConsultorio([]);
      setEstablecimientoId(null);
      setConsultorioId(null);
      setTipoConsultorioId(null);
      closeModal();
      onTable();
      onClose();
    } catch (e) {
      closeModal();
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo guardar los datos');
      } else {
        return toast.error('Intentelo mas tarde');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDataEstablecimiento([]);
    setDataConsultorio([]);
    setDataTipoConsultorio([]);
    setEstablecimientoId(null);
    setConsultorioId(null);
    setTipoConsultorioId(null);
    closeModal();
    onClose();
  };
  useEffect(() => {
    const dataLoad = async () => {
      try {
        if (!open) return;
        setLoadingEstablecimiento(true);

        const response = await ConsultorioServices.getSelectEstablecimientos();

        if (!response.ok) {
          throw new Error(
            response.message || 'No se puedo cargar los establecimientos',
          );
        }

        setDataEstablecimiento(
          Array.isArray(response.data) ? response.data : [],
        );
      } catch (e) {
        if (e instanceof Error) {
          return toast.error(
            e.message || 'No se Pudo cargar los establecimientos',
          );
        } else {
          return toast.error('Intentelo mas tarde');
        }
      } finally {
        setLoadingEstablecimiento(false);
      }
    };
    dataLoad();
  }, [open, establecimientoId]);

  useEffect(() => {
    const dataLoad = async () => {
      try {
        if (!open) return;
        setLoadingConsultorio(true);
        const response = await ConsultorioServices.getSelectSiais({
          establecimiento_id: establecimientoId,
        });
        setDataConsultorio(Array.isArray(response.data) ? response.data : []);
      } catch (e) {
        if (e instanceof Error) {
          return toast.error(e.message || 'No se pudo cargar los datos');
        } else {
          return toast.error('Algo salio mal intentelo mas tarde');
        }
      } finally {
        setLoadingConsultorio(false);
      }
    };
    dataLoad();
  }, [establecimientoId]);

  useEffect(() => {
    const dataLoad = async () => {
      try {
        if (!open) return;
        setLoadingTipoConsultorio(true);
        const response = await ConsultorioServices.getSelecTipoConsultorio();

        setDataTipoConsultorio(
          Array.isArray(response.data) ? response.data : [],
        );
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
  }, [consultorioId]);

  const handleConfiguration = (payload) => {
    setConfiguracion(payload);
  };
  if (!open) return null;

  const puedeContinuar =
    establecimientoId && consultorioId && tipoConsultorioId && configuracion;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
        <div className="flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* HEADER */}
          <div className="flex items-start justify-between border-b border-slate-200 px-7 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <BuildingOffice2Icon className="h-7 w-7 text-emerald-800" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  REGISTRAR UN NUEVO CONSULTORIO DEL SIAIS EN EL SISTEMA DE
                  FICHAS
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Complete la información para continuar con la reserva de ficha
                  médica.
                </p>
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

          {/* STEPS */}
          <div className="border-b border-slate-200 px-8 py-5">
            <div className="relative grid grid-cols-3">
              <div className="absolute left-[16%] right-[16%] top-5 h-0.5 bg-slate-200" />

              <Step
                numero="1"
                texto="Establecimiento"
                activo={Boolean(establecimientoId)}
              />

              <Step
                numero="2"
                texto="Consultorio"
                activo={Boolean(consultorioId)}
              />

              <Step
                numero="3"
                texto="Tipo de consultorio"
                activo={Boolean(tipoConsultorioId)}
              />
            </div>
          </div>

          {/* BODY */}
          <div className="grid flex-1 gap-7 overflow-y-auto px-7 py-7 lg:grid-cols-3">
            {/* ESTABLECIMIENTO */}
            <SelectableList
              title="1. SELECCIONE UN ESTABLECIMIENTO"
              items={dataEstablecimiento}
              value={establecimientoId}
              onChange={seleccionarEstablecimiento}
              searchPlaceholder="Buscar establecimiento..."
              loading={loadingEstablecimiento}
            />

            <SelectableList
              title="2. SELECCIONE UN CONSULTORIO"
              items={dataCosutorio}
              value={consultorioId}
              onChange={seleccionarConsultorio}
              searchPlaceholder="Buscar consultorio..."
              loading={loadingConsultorio}
            />

            <SelectableList
              title="2. SELECCIONE EL TIPO DE CONSULTORIO"
              items={dataTipoConsulotorio}
              value={tipoConsultorioId}
              onChange={setTipoConsultorioId}
              loading={loadingTipoConsultorio}
            />
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-7 py-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <div className="flex gap-5">
              <button
                type="button"
                onClick={() => {
                  openModal(MODALS.CONFIGURATION);
                }}
                className="flex items-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Configuracion
                <Cog6ToothIcon className="h-5 w-5" />
              </button>

              <button
                type="button"
                disabled={!puedeContinuar}
                onClick={() => {
                  openModal(MODALS.CREATE);
                }}
                className="flex items-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Continuar
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={isModalOpen(MODALS.CREATE)}
        onClose={closeModal}
        onConfirm={continuar}
        type="crear"
        loading={loading}
      />
      <ConfiguracionFichasModal
        open={isModalOpen(MODALS.CONFIGURATION)}
        onClose={closeModal}
        onSave={handleConfiguration}
      />
    </>
  );
}

function Step({ numero, texto, activo }) {
  return (
    <div className="relative z-10 flex flex-col items-center">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
          activo
            ? 'border-emerald-800 bg-emerald-800 text-white'
            : 'border-slate-300 bg-white text-slate-500'
        }`}
      >
        {numero}
      </div>

      <span
        className={`mt-2 text-sm font-medium ${
          activo ? 'text-emerald-800' : 'text-slate-500'
        }`}
      >
        {texto}
      </span>
    </div>
  );
}
