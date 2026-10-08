import { useEffect, useState } from 'react';
import {
  XMarkIcon,
  ClockIcon,
  CalendarDaysIcon,
  CheckIcon,
  UserIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import InputComponent from '../../../../components/InputComponent';
import { toast } from 'react-toastify';
import {
  consultorioConfiguarionSchema,
  consultorioConfigurationUpdateSchema,
} from '../schema';
import { ConsultorioServices } from '../services';
import { getChangedFields } from '../../../../helper/getChangedFields.helper';
import ConfirmModal from '../../../../components/ConfirmModal';

const DIAS_SEMANA = [
  { id: 1, nombre: 'Lunes', value: 1 },
  { id: 2, nombre: 'Martes', value: 2 },
  { id: 3, nombre: 'Miércoles', value: 3 },
  { id: 4, nombre: 'Jueves', value: 4 },
  { id: 5, nombre: 'Viernes', value: 5 },
  { id: 6, nombre: 'Sábado', value: 6 },
  { id: 0, nombre: 'Domingo', value: 0 },
];

const initialForm = () => ({
  cantidad_fichas_por_dia: '',
  dias_anticipacion: 1,
  dias_habilitados: [],
});

export default function ConfiguracionFichasModal({
  id,
  isEdit,
  open,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(initialForm());
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [originalForm, setOriginalForm] = useState({});

  //
  const [formSave, setFormSave] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  //

  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    if (!open) return;

    const dataLoad = async () => {
      setError({});
      try {
        if (isEdit && id) {
          setLoading(true);

          const response = await ConsultorioServices.getConfiguracionById({
            id,
          });

          if (!response.ok) {
            throw new Error(
              response?.message || 'No se pudo obtener la configuración',
            );
          }
          setOriginalForm(response?.data ?? initialForm());
          setForm(response?.data ?? initialForm());
        } else {
          setForm(initialForm());
        }
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message || 'No se pudo obtener la configuración');
        } else {
          toast.error('Algo salió mal, inténtelo más tarde');
        }
      } finally {
        setLoading(false);
      }
    };

    dataLoad();
  }, [open, isEdit, id]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleDia = (id) => {
    setForm((prev) => {
      const existe = prev.dias_habilitados.includes(id);

      return {
        ...prev,
        dias_habilitados: existe
          ? prev.dias_habilitados.filter((diaId) => diaId !== id)
          : [...prev.dias_habilitados, id],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isEdit ? getChangedFields(originalForm, form) : form;

    if (isEdit && Object.keys(payload).length === 0) {
      toast.info('No realizaste ningún cambio');
      return;
    }

    const result = isEdit
      ? consultorioConfigurationUpdateSchema.safeParse(payload)
      : consultorioConfiguarionSchema.safeParse(form);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      setError(fieldErrors);
      toast.error('Datos incorrectos');
      return;
    }
    if (isEdit) {
      setFormSave(result.data);
      setOpenModal(true);
    } else {
      onClose();
      setForm(initialForm());
      onSave(result.data);
    }
  };

  const handleSave = async () => {
    try {
      setLoadingSave(true);
      if (isEdit) {
        const response = await ConsultorioServices.updateConfiguracionById({
          id,
          payload: formSave,
        });
        if (!response.ok) {
          setOpenModal(false);
          throw new Error(response.message || 'No se pudo gardar');
        }
        toast.success(
          response.message || 'Configuracion correctamente actualizado',
        );
        setOpenModal(false);
        setForm(initialForm());
        onClose();
      }
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo guardar');
      } else {
        return toast.error('Algo salio mal, Intentelo mas tarde');
      }
    } finally {
      setLoadingSave(false);
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-[2px] sm:p-4">
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            bg-white
            px-6
            py-10
            shadow-2xl
            sm:px-10
            sm:py-12
          "
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="
                h-10 w-10
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-[#064135]
                sm:h-12
                sm:w-12
              "
            />

            <div className="text-center">
              <p className="font-semibold text-slate-700">
                {isEdit
                  ? 'Actualizando configuracion'
                  : ' Cargando configuración'}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {isEdit ? 'Guardando...' : 'Obteniendo información...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="
        fixed
        inset-0
        z-50
        flex
        items-end
        justify-center
        bg-slate-900/60
        backdrop-blur-[2px]
        sm:items-center
        sm:p-4
      "
      >
        <div
          className="
          flex
          max-h-[95dvh]
          w-full
          flex-col
          overflow-hidden
          rounded-t-2xl
          bg-white
          shadow-2xl
          sm:max-h-[90dvh]
          sm:max-w-3xl
          sm:rounded-2xl
        "
        >
          {/* ============================
            HEADER
        ============================ */}

          <div
            className="
            flex
            shrink-0
            items-start
            justify-between
            gap-3
            border-b
            border-slate-200
            px-4
            py-4
            sm:px-6
            sm:py-5
            md:px-7
            md:py-6
          "
          >
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <div
                className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-emerald-50
                text-[#065f54]
                sm:h-12
                sm:w-12
                md:h-14
                md:w-14
              "
              >
                <CalendarDaysIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                  text-base
                  font-bold
                  text-slate-800
                  sm:text-lg
                  md:text-xl
                "
                >
                  Configurar reglas de fichas
                </h2>

                <p
                  className="
                  mt-1
                  hidden
                  max-w-lg
                  text-sm
                  leading-5
                  text-slate-500
                  sm:block
                  sm:leading-6
                "
                >
                  Define el horario, límite diario y los días habilitados para
                  la emisión de fichas.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
              shrink-0
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
            >
              <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* ============================
            FORMULARIO CON SCROLL
        ============================ */}

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div
              className="
              flex-1
              overflow-y-auto
              overscroll-contain
              px-4
              sm:px-6
              md:px-7
            "
            >
              <section className="border-b border-slate-200 py-5 sm:py-6">
                <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-4">
                  <div
                    className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-[#065f54]
                    sm:h-11
                    sm:w-11
                  "
                  >
                    <DocumentCheckIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                      Cantidad de fichas
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      Ingrese la cantidad de fichas limite del consultorio
                    </p>
                  </div>
                </div>

                <div
                  className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  sm:gap-5
                  md:pl-15
                "
                >
                  <InputComponent
                    label="Cantidad de fichas"
                    type="number"
                    name="cantidad_fichas_por_dia"
                    value={form.cantidad_fichas_por_dia}
                    onChange={handleChange}
                    error={error?.cantidad_fichas_por_dia}
                  />
                </div>
              </section>

              <section className="border-b border-slate-200 py-5 sm:py-6">
                <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-4">
                  <div
                    className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-[#065f54]
                    sm:h-11
                    sm:w-11
                  "
                  >
                    <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                      Anticipacion maxima para programacion
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      Ingrese la parametrizaciond de la anticipacion maxima para
                      la programacion
                    </p>
                  </div>
                </div>

                <div
                  className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  sm:gap-5
                  md:pl-15
                "
                >
                  <InputComponent
                    label="Anticipacion maxima por dias"
                    type="number"
                    name="dias_anticipacion"
                    value={form.dias_anticipacion}
                    onChange={handleChange}
                    error={error?.dias_anticipacion}
                  />
                </div>
              </section>

              {/* ========================
                DÍAS
            ======================== */}

              <section className="py-5 sm:py-6">
                <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-4">
                  <div
                    className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-[#065f54]
                    sm:h-11
                    sm:w-11
                  "
                  >
                    <CalendarDaysIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                      Días habilitados
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      Selecciona los días de la semana en los que se podrán
                      sacar fichas.
                    </p>
                  </div>
                </div>

                <div
                  className="
                  grid
                  grid-cols-2
                  gap-2
                  sm:grid-cols-3
                  sm:gap-3
                  md:grid-cols-4
                  md:pl-15
                "
                >
                  {DIAS_SEMANA.map((dia) => {
                    const seleccionado = form.dias_habilitados.includes(dia.id);

                    return (
                      <button
                        key={dia.id}
                        type="button"
                        onClick={() => handleDia(dia.id)}
                        className={`
                        flex
                        min-h-11
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        px-2
                        py-2.5
                        text-xs
                        font-medium
                        transition
                        sm:min-h-12
                        sm:px-3
                        sm:text-sm
                        ${
                          seleccionado
                            ? 'border-emerald-800 bg-emerald-800 text-white shadow-sm'
                            : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-900 hover:bg-emerald-50'
                        }
                      `}
                      >
                        <span
                          className={`
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded
                          border
                          ${
                            seleccionado
                              ? 'border-white bg-white text-[#065f54]'
                              : 'border-slate-400'
                          }
                        `}
                        >
                          {seleccionado && (
                            <CheckIcon
                              strokeWidth={3}
                              className="h-3.5 w-3.5"
                            />
                          )}
                        </span>

                        <span className="truncate">{dia.nombre}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* ============================
              FOOTER
          ============================ */}

            <div
              className="
              flex
              shrink-0
              flex-col-reverse
              gap-2
              border-t
              border-slate-200
              bg-slate-50
              px-4
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-end
              sm:gap-3
              sm:px-6
              sm:py-5
              md:px-7
            "
            >
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-100
                disabled:opacity-50
                sm:w-auto
              "
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-emerald-800
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-emerald-900
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
                sm:min-w-46
              "
              >
                {isEdit ? 'Editar configuracion' : 'Guardar configuración'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmModal
        open={openModal}
        loading={loadingSave}
        onClose={() => {
          setOpenModal(false);
        }}
        onConfirm={handleSave}
        type="editar"
      />
    </>
  );
}
