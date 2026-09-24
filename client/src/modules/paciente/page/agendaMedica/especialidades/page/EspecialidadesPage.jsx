import { useNavigate } from 'react-router-dom';
import {
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  HeartIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import ServiceCard from '../../../../components/ServiceCard';

const servicios = [
  {
    id: 1,
    title: 'Medicina Familiar',
    description: 'Agenda tu cita con tu médico de cabecera',
    icon: CalendarDaysIcon, // 📅 calendario → agendar
    variant: 'green',
    path: '/agenda-medica/citas',
  },
  {
    id: 2,
    title: 'Odontología',
    description: 'Reserva y gestiona tus citas odontológicas',
    icon: ClipboardDocumentCheckIcon, // ✅ check → confirmar reserva
    variant: 'blue',
    path: '/agenda-medica/programaciones',
  },
  {
    id: 3,
    title: 'Especialidades',
    description: 'Consulta el historial de tus citas con especialistas',
    icon: ClipboardDocumentListIcon, // 📋 lista → historial
    variant: 'green',
    path: '/agenda-medica/historial',
  },
];

export default function EspecialidadesPage() {
  const navigate = useNavigate();
  return (
    <>
      {' '}
      {/* CONTENIDO */}
      <main className="flex min-w-0 flex-col">
        <div className="flex justify-between">
          {/* TÍTULO */}
          <div>
            <h1 className="text-3xl font-bold text-slate-700">
              Servicios Disponibles - Seleccione una especialidad
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-1 text-sm text-slate-700">
              <span className="font-bold">COCHABAMBA</span>

              <span>|</span>

              <span>CIMFA POLICLINICO QUILLACOLLO</span>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="
            group mb-4 inline-flex w-fit items-center gap-2
            rounded-lg px-3 py-2
            text-2xl font-semibold text-slate-600
            transition-colors
            hover:bg-slate-100 hover:text-slate-900
            focus:outline-none focus:ring-2 focus:ring-slate-300
          "
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Volver
          </button>
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
                onClick={() => navigate(servicio.path)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
