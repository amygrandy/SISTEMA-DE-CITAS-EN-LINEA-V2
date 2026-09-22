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

import { ConsultorioServices } from '../services';
import { toast } from 'react-toastify';
import ConfirmModal from '../../../../components/ConfirmModal';

export default function ModalSeleccionConsultorio({ open, onClose, onTable }) {
  const [establecimientoId, setEstablecimientoId] = useState(null);
  const [consultorioId, setConsultorioId] = useState(null);
  const [tipoConsultorioId, setTipoConsultorioId] = useState(null);

  const [searchEstablecimiento, setSearchEstablecimiento] = useState('');
  const [searchConsultorio, setSearchConsultorio] = useState('');

  //
  const [dataEstablecimiento, setDataEstablecimiento] = useState([]);
  const [dataCosutorio, setDataConsultorio] = useState([]);
  const [dataTipoConsulotorio, setDataTipoConsultorio] = useState([]);

  //

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const establecimientosFiltrados = dataEstablecimiento.filter((item) =>
    item.label.toLowerCase().includes(searchEstablecimiento.toLowerCase()),
  );

  const consultoriosFiltrados =
    dataCosutorio?.filter((item) =>
      item.label.toLowerCase().includes(searchConsultorio.toLowerCase()),
    ) ?? [];

  const seleccionarEstablecimiento = (id) => {
    setEstablecimientoId(id);
    setTipoConsultorioId(null);
    setConsultorioId(null);
    setDataConsultorio([]);
    setDataTipoConsultorio([]);
  };

  const seleccionarConsultorio = (id) => {
    setConsultorioId(id);
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
      setOpenModal(false);
      onTable();
      onClose();
    } catch (e) {
      setOpenModal(false);
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
    onClose();
  };
  useEffect(() => {
    const dataLoad = async () => {
      try {
        if (!open) return;

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
      }
    };
    dataLoad();
  }, [open, establecimientoId]);

  useEffect(() => {
    const dataLoad = async () => {
      try {
        if (!open) return;

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
      }
    };
    dataLoad();
  }, [establecimientoId]);

  useEffect(() => {
    const dataLoad = async () => {
      try {
        if (!open) return;

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
      }
    };
    dataLoad();
  }, [consultorioId]);

  if (!open) return null;

  const puedeContinuar =
    establecimientoId && consultorioId && tipoConsultorioId;

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
            <section>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  1. Seleccione el establecimiento
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Elija el establecimiento de salud donde desea atenderse.
                </p>
              </div>

              <SearchInput
                value={searchEstablecimiento}
                onChange={setSearchEstablecimiento}
                placeholder="Buscar establecimiento..."
              />

              <div className="mt-4 max-h-91.25 overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200">
                {establecimientosFiltrados.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => seleccionarEstablecimiento(item.value)}
                    className={`flex w-full items-center gap-4 border-b border-slate-100 px-4 py-4 text-left transition last:border-none ${
                      establecimientoId === item.value
                        ? 'bg-emerald-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        establecimientoId === item.value
                          ? 'bg-blue-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <BuildingOffice2Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800">
                        {item.label}
                      </p>
                    </div>

                    {establecimientoId === item.value && <SelectedIcon />}
                  </button>
                ))}
              </div>
            </section>

            {/* CONSULTORIOS */}
            <section>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  2. Seleccione el consultorio
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Seleccione uno de los consultorios disponibles.
                </p>
              </div>

              <SearchInput
                value={searchConsultorio}
                onChange={setSearchConsultorio}
                placeholder="Buscar consultorio..."
                disabled={!establecimientoId}
              />

              {!establecimientoId ? (
                <EmptyState text="Primero seleccione un establecimiento." />
              ) : consultoriosFiltrados.length === 0 ? (
                <EmptyState text="Este establecimiento no tiene consultorios disponibles." />
              ) : (
                <div className="mt-4 max-h-91.25 overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200">
                  {consultoriosFiltrados.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => seleccionarConsultorio(item.value)}
                      className={`flex w-full items-center gap-4 border-b border-slate-100 px-4 py-4 text-left transition last:border-none ${
                        consultorioId === item.value
                          ? 'bg-emerald-50'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          consultorioId === item.value
                            ? 'bg-blue-100 text-emearald-600'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <HeartIcon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-800">
                          {item.label}
                        </p>
                      </div>

                      {consultorioId === item.value && <SelectedIcon />}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* TIPO DE CONSULTORIO */}
            <section>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  3. Seleccione el tipo de consultorio
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Indique el tipo de atención que necesita.
                </p>
              </div>

              {!consultorioId ? (
                <EmptyState text="Primero seleccione un consultorio." />
              ) : (
                <div className="mt-4 max-h-105 overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200">
                  {dataTipoConsulotorio?.map((tipo) => {
                    const selected = tipoConsultorioId === tipo.value;

                    return (
                      <button
                        key={tipo.value}
                        type="button"
                        onClick={() => setTipoConsultorioId(tipo.value)}
                        className={`flex w-full items-center  gap-4 rounded-2xl border p-5 text-left transition ${
                          selected
                            ? 'border-emerald-800 bg-emerald-50 shadow-sm'
                            : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            selected
                              ? 'bg-blue-100 text-emerald-800'
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
                              ? 'border-emerald-800 bg-emerald-900'
                              : 'border-slate-300'
                          }`}
                        >
                          {selected && (
                            <CheckIcon className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
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

            <button
              type="button"
              disabled={!puedeContinuar}
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continuar
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={continuar}
        type="crear"
        loading={loading}
      />
    </>
  );
}

function SearchInput({ value, onChange, placeholder, disabled = false }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 ${
        disabled ? 'bg-slate-50 opacity-60' : ''
      }`}
    >
      <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-slate-400" />

      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

function SelectedIcon() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800">
      <CheckIcon className="h-4 w-4 text-white" />
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="mt-4 flex min-h-52 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
      <div>
        <BuildingOffice2Icon className="mx-auto h-8 w-8 text-slate-300" />

        <p className="mt-3 text-sm text-slate-500">{text}</p>
      </div>
    </div>
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
