import { useNavigate } from 'react-router-dom';
import {
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import ServiceCard from '../../../../components/ServiceCard';
import SeleccionarPaciente from '../../../../components/SeleccionarPaciente';
import {
  MODALS,
  useModalManager,
} from '../../../../../../hooks/useModalManager';

const servicios = [
  {
    id: 1,
    title: 'Citas Médicas',
    description: 'Registro de nuevas citas médicas',
    icon: CalendarDaysIcon,
    variant: 'green',
    path: '/paciente/especialidades',
  },
  {
    id: 2,
    title: 'Programaciones Realizadas',
    description: 'Reservas de citas médicas pendientes',
    icon: ClipboardDocumentCheckIcon,
    variant: 'blue',
    path: '/agenda-medica/programaciones',
  },
  {
    id: 3,
    title: 'Historial',
    description: 'Historial de citas médicas',
    icon: ClipboardDocumentListIcon,
    variant: 'green',
    path: '/agenda-medica/historial',
  },
];

export default function AgendaMedica() {
  const navigate = useNavigate();
  const { closeModal, isModalOpen, modalState, openModal } = useModalManager();

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
        navigate('/paciente/programaciones-realizadas', {
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
      {/* CONTENIDO */}
      <main className="flex min-w-0 flex-col">
        {/* TÍTULO */}
        <div>
          <h1 className="text-3xl font-bold text-slate-700">
            Servicios Disponibles
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-1 text-sm text-slate-700">
            <span className="font-bold">COCHABAMBA</span>

            <span>|</span>

            <span>CIMFA POLICLINICO QUILLACOLLO</span>
          </div>
        </div>

        {/* CONTENEDOR */}
        <section
          className="
                  mt-5 rounded-2xl bg-white
                  p-6
                  shadow-[0_1px_3px_rgba(15,23,42,0.04)]
                "
        >
          <div
            className="
                    grid gap-6
                    md:grid-cols-2
                    xl:grid-cols-3
                  "
          >
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
      </main>
      <SeleccionarPaciente
        open={modalPacienteAbierto}
        onClose={closeModal}
        onConfirm={handleOpciones}
      />
    </>
  );
}
