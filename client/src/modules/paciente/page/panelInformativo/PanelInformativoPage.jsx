import { useNavigate } from 'react-router-dom';

import {
  CalendarDaysIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

import ServiceCard from '../../components/ServiceCard';
import { MODALS, useModalManager } from '../../../../hooks/useModalManager';
import SeleccionarPaciente from '../../components/SeleccionarPaciente';
import { useState } from 'react';

import { useAuth } from '../../../../context/AuthContext';

const formatearNombre = (str = '') =>
  str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const servicios = [
  {
    id: 1,
    title: 'Agendar citas',
    description: 'Registro de nuevas citas médicas',
    icon: CalendarDaysIcon,
    variant: 'green',
  },
  {
    id: 2,
    title: 'Citas Programadas',
    description: 'Reservas de citas médicas',
    icon: ClipboardDocumentCheckIcon,
    variant: 'blue',
  },
  {
    id: 3,
    title: 'Historial de Citas',
    description: 'Historial de citas médicas',
    icon: ClipboardDocumentListIcon,
    variant: 'green',
  },
];

export default function PanelInformativoPage() {
  const navigate = useNavigate();
  const { closeModal, isModalOpen, modalState, openModal } = useModalManager();

  const { usuario } = useAuth();

  const handleIrEspecialidad = (id) => {
    switch (id) {
      case 1:
        navigate('/paciente/especialidades');
        break;

      case 2:
        openModal(MODALS.POGRAMACIONES_CITAS);
        break;

      case 3:
        openModal(MODALS.HISOTRIAL_CITAS);
        break;

      default:
        break;
    }
  };

  const handleOpciones = (asegurado) => {
    switch (modalState.type) {
      case MODALS.POGRAMACIONES_CITAS:
        navigate('/paciente/fichas-programadas', {
          state: {
            ...asegurado,
            tipo: 'PROGRAMACIONES REALIZADAS',
          },
        });
        break;

      case MODALS.HISOTRIAL_CITAS:
        navigate('/paciente/historial', {
          state: {
            ...asegurado,
            tipo: 'HISTORIAL CITAS',
          },
        });
        break;

      default:
        break;
    }
  };
  const modalPacienteAbierto =
    isModalOpen(MODALS.POGRAMACIONES_CITAS) ||
    isModalOpen(MODALS.HISOTRIAL_CITAS);

  return (
    <>
      {' '}
      <div className="space-y-6">
        {/* BIENVENIDA */}
        <section
          className="
          relative overflow-hidden rounded-3xl
          border border-[#d6e3e0]
          bg-linear-to-br from-white via-white to-[#e6f1ee]
          p-6 shadow-sm
          lg:p-8
        "
        >
          {/* DECORACIÓN */}
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#245249]/5" />
          <div className="absolute -bottom-24 right-24 h-52 w-52 rounded-full bg-[#4f7c73]/5" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex items-start gap-5">
              <div
                className="
                flex h-16 w-16 shrink-0 items-center justify-center
                rounded-2xl bg-[#245249] text-white shadow-sm
              "
              >
                <UserCircleIcon className="h-9 w-9" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#4f7c73]">
                  Panel del asegurado
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-800 lg:text-3xl">
                  ¡Bienvenido,{' '}
                  {formatearNombre(
                    `${usuario?.nombres ?? ''} ${usuario?.apellido_paterno ?? ''} ${usuario?.apellido_materno ?? ''}`,
                  )}
                  !
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Desde este espacio puedes consultar el estado de tu
                  afiliación, revisar tus servicios habilitados y acceder
                  rápidamente a la atención médica disponible.
                </p>
              </div>
            </div>

            <div
              className="
              flex shrink-0 items-center gap-3
              rounded-2xl border border-emerald-100
              bg-white/80 px-4 py-3
              backdrop-blur
            "
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <ShieldCheckIcon className="h-6 w-6 text-emerald-600" />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Estado general
                </p>

                <p className="text-sm font-bold text-emerald-700">
                  Asegurado habilitado
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INFORMACIÓN PRINCIPAL */}
        <div className="grid gap-6">
          {/* COLUMNA IZQUIERDA */}
          <div className="space-y-6">
            {/* ACCESOS RÁPIDOS */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-800">
                  Accesos rápidos
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Ingresa directamente a los servicios que utilizas con mayor
                  frecuencia.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {servicios.map((servicio) => (
                  <ServiceCard
                    key={servicio.id}
                    title={servicio.title}
                    description={servicio.description}
                    icon={servicio.icon}
                    variant={servicio.variant}
                    onClick={() => handleIrEspecialidad(servicio.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <SeleccionarPaciente
        open={modalPacienteAbierto}
        onClose={closeModal}
        onConfirm={handleOpciones}
      />
    </>
  );
}

function ReminderItem({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50">
        <Icon className="h-5 w-5 text-slate-500" />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>

        <p className="mt-0.5 text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}
