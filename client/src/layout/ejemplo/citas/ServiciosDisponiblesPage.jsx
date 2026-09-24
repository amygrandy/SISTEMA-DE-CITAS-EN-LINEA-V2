import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

import Header from '../Header';
import Sidebar from '../Sidebar';
import ServiceCard from './ServiceCard';

export default function ServiciosDisponiblesPage() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const servicios = [
    {
      id: 1,
      title: 'Citas Médicas',
      description: 'Registro de nuevas citas médicas',
      icon: CalendarDaysIcon,
      variant: 'green',
      path: '/agenda-medica/citas',
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

  return (
    <div className="min-h-screen bg-[#e8eeee]">
      {/* HEADER */}
      <Header
        onMenu={() => {
          setSidebarOpen((prev) => !prev);
        }}
      />

      {/* BODY */}
      <div
        className={`
    grid min-h-[calc(100vh-64px)]
    gap-6 p-6
    transition-[grid-template-columns] duration-300 ease-in-out

    ${
      sidebarOpen
        ? 'lg:grid-cols-[285px_minmax(0,1fr)]'
        : 'lg:grid-cols-[0px_minmax(0,1fr)]'
    }
  `}
      >
        {/* SIDEBAR */}
        <aside
          className={`
      hidden overflow-hidden lg:block
      transition-all duration-300 ease-in-out
      ${
        sidebarOpen
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0'
      }
    `}
        >
          <div className="w-71.25">
            <Sidebar />
          </div>
        </aside>

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
                  onClick={() => navigate(servicio.path)}
                />
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-auto pt-12 text-center">
            <p className="text-sm text-slate-700">Copyright © 2025 CNS</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
