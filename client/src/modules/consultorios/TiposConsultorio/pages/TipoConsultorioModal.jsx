import {
  XMarkIcon,
  BuildingOffice2Icon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import InputComponent from '../../../../components/InputComponent';
import SelectComponent from '../../../../components/SelectComponent';
import ConfirmModal from '../../../../components/ConfirmModal';
import { toast } from 'react-toastify';
import { getChangedFields } from '../../../../helper/getChangedFields.helper';
//
import { TipoConsultorioSchema, TipoConsultorioUpdateSchema } from '../schema';
//
import { TipoConsultorioServices } from '../services';
const CAMPOS_MAYUSCULAS = ['nombre_tipo'];

const initialForm = () => ({
  nombre_tipo: '',
  estado: false,
});

export default function tipoConsultorioModal({
  isEdit = false,
  open,
  onClose,
  row,
  onTable,
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm());
  const [originalForm, setOriginalForm] = useState({});
  const [error, setError] = useState({});
  //
  const [openModal, setOpenModal] = useState(false);
  //Modal confimacion
  useEffect(() => {
    if (!open) return;
    try {
      if (isEdit) {
        setForm(row);
        setOriginalForm(row);
      } else {
        setForm(initialForm());
      }
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message);
      } else {
        return toast.error('Ocurrio un error inesperado intentelo mas tarde');
      }
    }
  }, [open, row, isEdit]);
  //
  const handleChange = ({ target: { name, value } }) => {
    const nuevoValor = CAMPOS_MAYUSCULAS.includes(name)
      ? value.toUpperCase()
      : value;
    setForm((prev) => ({ ...prev, [name]: nuevoValor }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };
  if (!open) return null;
  const validarForm = () => {
    const payload = isEdit ? getChangedFields(originalForm, form) : form;

    if (isEdit && Object.keys(payload).length === 0) {
      toast.info('No realizaste ningún cambio');
      return;
    }

    const result = isEdit
      ? TipoConsultorioUpdateSchema.safeParse(payload)
      : TipoConsultorioSchema.safeParse(payload);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      setError(fieldErrors);
      toast.error('Datos incorrectos');
      return;
    } else {
      setOpenModal(true);
      const data = result.data;
      return data;
    }
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const response = isEdit
        ? await TipoConsultorioServices.update({
            id: row.id,
            payload: validarForm(),
          })
        : await TipoConsultorioServices.create(validarForm());
      if (!response.ok) {
        throw new Error(response.message || 'No se puddo crear el registro');
      }
      toast.success(
        response.message || 'Se pudo crear el registro correctamente',
      );
      setForm(initialForm());
      setOpenModal(false);
      onTable();
      onClose();
    } catch (e) {
      setOpenModal(false);
      if (e instanceof Error) {
        return toast.error(e.message);
      } else {
        return toast.error('Ocurrio un error inesperado intentelo mas tarde');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
        <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* HEADER */}
          <div className="flex items-start justify-between border-b border-slate-200 px-7 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <BuildingOffice2Icon className="h-7 w-7 text-emerald-800" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  REGISTRAR UN NUEVO TIPO DE CONSULTORIO
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

          <div className="grid flex-1 gap-7  px-7 py-7 lg:grid-cols-2">
            <InputComponent
              label={'INGRESE UN NOMBRE'}
              value={form?.nombre_tipo}
              name={'nombre_tipo'}
              onChange={handleChange}
              error={error?.nombre_tipo}
            />
            <SelectComponent
              label="SELECCION UN ESTADO"
              value={form?.estado}
              name={'estado'}
              error={error?.estado}
              onChange={handleChange}
              options={[
                { value: true, label: 'HABILITADO' },
                { value: false, label: 'DESHABILITADO' },
              ]}
            />
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-7 py-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                setForm(initialForm());
                setError({});
              }}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              onClick={() => {
                validarForm();
              }}
            >
              Continuar
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={openModal}
        loading={loading}
        onClose={() => {
          setOpenModal(false);
        }}
        onConfirm={handleSave}
        type={isEdit ? 'editar' : 'crear'}
      />
    </>
  );
}
