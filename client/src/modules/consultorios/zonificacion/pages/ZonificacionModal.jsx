import {
  XMarkIcon,
  BuildingOffice2Icon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import SelectableList from '../../../../components/SelectableList';
import { useEffect, useState } from 'react';
import { ZonificacionServices as services } from '../zonificacion.services';
import { toast } from 'react-toastify';
import ConfirmModal from '../../../../components/ConfirmModal';

export default function ZonificacionModal({
  open,
  onClose,
  isEdit,
  id,
  onTable,
}) {
  //
  const [dataEstablecimientos, setDataEstablecimiento] = useState([]);
  const [loadinEstablecimiento, setLoadingEstablecimiento] = useState(false);
  const [selectedIdEstablecimiento, setSelectIdEstablecimiento] =
    useState(null);
  //
  const [dataConsultorioAsig, setDataConsultorioAsig] = useState([]);
  const [loadinConsultorioAsig, setLoadingConsultorioAsig] = useState(false);
  const [selectIdConsultorioAsig, setSelectIdConsultorioAsig] = useState(null);
  //
  const [dataConsultorios, setDataConsultorios] = useState([]);
  const [loadingConsultorio, setLoadingConsultorio] = useState(false);
  const [selectIdsConsultorio, setSelectIdsConsultorio] = useState(null);
  //
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  useEffect(() => {
    try {
      if (!open) return;
      setLoadingEstablecimiento(true);
      const dataLoad = async () => {
        const response = await services.getSelectEstablecimiento();

        if (!response.ok) {
          throw new Error(
            response.message || 'No se encontraron los establecimientos',
          );
        }
        setDataEstablecimiento(
          Array.isArray(response.data) ? response.data : [],
        );
      };
      dataLoad();
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(
          e.message || 'No se encontraron los establecimientos',
        );
      } else {
        return toast.error('Algo salio mal, intentelo mas tarde');
      }
    } finally {
      setLoadingEstablecimiento(false);
    }
  }, [open]);
  useEffect(() => {
    try {
      if (!open) return;
      setLoadingConsultorioAsig(true);
      setSelectIdsConsultorio(null);
      setSelectIdConsultorioAsig(null);
      setDataConsultorios([]);
      setDataConsultorioAsig([]);
      const dataLoad = async () => {
        const response = await services.getSelectConsultoriosByEstablecimiento({
          establecimiento_id: selectedIdEstablecimiento,
        });

        if (!response.ok) {
          throw new Error(
            response.message || 'No se encontraron los consultorios',
          );
        }
        setDataConsultorioAsig(
          Array.isArray(response.data) ? response.data : [],
        );
      };
      dataLoad();
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se encontraron los consultorios');
      } else {
        return toast.error('Algo salio mal, intentelo mas tarde');
      }
    } finally {
      setLoadingConsultorioAsig(false);
    }
  }, [selectedIdEstablecimiento]);

  useEffect(() => {
    try {
      if (!open) return;
      setLoadingConsultorio(true);
      const data = dataConsultorioAsig.filter(
        (row) => row.value != selectIdConsultorioAsig,
      );
      setDataConsultorios(Array.isArray(data) ? data : []);
    } catch (e) {
    } finally {
      setLoadingConsultorio(false);
    }
  }, [selectIdConsultorioAsig]);

  if (!open) return null;

  const handleSave = async () => {
    try {
      setLoadingConfirm(true);
      const data = {
        consultorio_asignado_id: selectIdConsultorioAsig,
        consultorioCabecera: selectIdsConsultorio,
      };

      const response = await services.create({ payload: data });

      if (!response.ok) {
        throw new Error(response.message || 'No se pudo guardar el registro');
      }
      setSelectIdEstablecimiento(null);
      setSelectIdsConsultorio(null);
      setSelectIdConsultorioAsig(null);
      setDataConsultorios([]);
      setDataConsultorioAsig([]);
      setOpenConfirm(false);
      onTable();
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo guardar el registro');
      } else {
        return toast.error('Algo salio mal, intentelo mas tarde');
      }
    } finally {
      setLoadingConfirm(false);
    }
  };
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
                  ZONIFICAR UN CONSULTORIO
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="grid flex-1 gap-7 overflow-y-auto px-7 py-7 lg:grid-cols-3">
            <SelectableList
              loading={loadinEstablecimiento}
              title="1. SELECCIONE UN ESTABLECIMIENTO"
              description="Puede seleccionar uno o varios consultorios."
              items={dataEstablecimientos}
              value={selectedIdEstablecimiento}
              onChange={setSelectIdEstablecimiento}
              searchPlaceholder="Buscar establecimiento..."
            />
            <SelectableList
              loading={loadinConsultorioAsig}
              title="2. SELECCIONE UN CONSULTORIO A ASIGNAR CONSULTORIOS"
              description="Puede seleccionar uno o varios consultorios."
              items={dataConsultorioAsig}
              value={selectIdConsultorioAsig}
              onChange={setSelectIdConsultorioAsig}
              searchPlaceholder="Buscar establecimiento..."
            />
            <SelectableList
              loading={loadingConsultorio}
              title="SELECCIONE CONSULTORIOS"
              description="Puede seleccionar uno o varios consultorios."
              items={dataConsultorios}
              value={selectIdsConsultorio}
              onChange={setSelectIdsConsultorio}
              searchPlaceholder="Buscar establecimiento..."
              multiple
            />
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-7 py-5">
            <button
              onClick={() => {
                setSelectIdEstablecimiento(null);
                setSelectIdsConsultorio(null);
                setSelectIdConsultorioAsig(null);
                setDataConsultorios([]);
                setDataConsultorioAsig([]);
                onClose();
              }}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              className="flex items-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              onClick={() => {
                setOpenConfirm(true);
              }}
            >
              Continuar
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={openConfirm}
        loading={loadingConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
        type="crear"
        onConfirm={handleSave}
      />
    </>
  );
}
