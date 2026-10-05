import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect, useCallback } from 'react';
import InputComponent from '../../../components/InputComponent';
import { CantidadBeneficiariosServices } from '../services/CantidaBeneficiariosl.services';
import { toast } from 'react-toastify';
import { CantidadFichasAseguradoSchema } from '../schema/CantidadBeneficiarios.schema';
import ConfirmModal from '../../../components/ConfirmModal';
import { MODALS, useModalManager } from '../../../hooks/useModalManager';

export default function CantidadBeneficiairosPage() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [error, setError] = useState({});
  const { closeModal, isModalOpen, modalState, openModal } = useModalManager();

  const dataLoad = useCallback(async () => {
    try {
      setLoading(true);
      const response = await CantidadBeneficiariosServices.getById();
      if (!response.ok) {
        throw new Error(response.message || 'No se pudo obtener el registro');
      }
      setForm(response.data);
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo obtener el registro');
      } else {
        return toast.error('Algo salio mal, intentelo mas tarde');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    dataLoad();
  }, [dataLoad]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };

  const validarForm = () => {
    const result = CantidadFichasAseguradoSchema.safeParse(form);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      setError(fieldErrors);
      toast.error('Datos incorrectos');
      return;
    } else {
      openModal(MODALS.EDIT, result.data);
    }
  };

  const handleSave = async () => {
    try {
      setLoadingSave(true);
      const response = await CantidadBeneficiariosServices.update({
        payload: modalState.data,
      });
      if (!response.ok) {
        throw new Error(
          response.message || 'No se pudo actualizar el registro',
        );
      }
      dataLoad();

      closeModal();
      return toast.success(
        response.message || 'Se actualizo correctamente el registro',
      );
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo obtener el registro');
      } else {
        return toast.error('Algo salio mal, intentelo mas tarde');
      }
    } finally {
      setLoadingSave(false);
    }
  };
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
            <p className="font-semibold text-slate-700">Cargando datos</p>

            <p className="mt-1 text-sm text-slate-500">
              Obteniendo información...
            </p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <>
      <div className="flex items-start justify-between border-b border-slate-200 px-7 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <BuildingOffice2Icon className="h-7 w-7 text-emerald-800" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              CANTIDAD DE FICHAS POR ASEGURADO
            </h2>
          </div>
        </div>
      </div>
      <div className="grid flex-1 gap-7 overflow-y-auto px-7 py-7 lg:grid-cols-3 bg-white">
        <InputComponent
          label={'Cantidad de fichas por asgurado'}
          name={'cantidad_ficha_por_asgurado'}
          value={form.cantidad_ficha_por_asgurado}
          onChange={handleChange}
          error={error?.cantidad_ficha_por_asgurado}
          type="number"
        />
      </div>
      <div className="flex items-center justify-end border-t border-slate-200 bg-white px-7 py-5">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300"
          onClick={validarForm}
        >
          Guardar Cambios
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <ConfirmModal
        open={isModalOpen(MODALS.EDIT)}
        loading={loadingSave}
        onClose={closeModal}
        onConfirm={handleSave}
        type="editar"
      />
    </>
  );
}
