import {
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MapIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const menuInicio = [
    {
      label: 'Panel Informativo',
      icon: HomeIcon,
      active: true,
    },
  ];

  const menuAsegurado = [
    {
      label: 'Perfil',
      icon: UserIcon,
    },
    {
      label: 'Beneficiarios',
      icon: UserGroupIcon,
    },
  ];

  const menuServicios = [
    {
      label: 'Agenda Médica',
      icon: CalendarDaysIcon,
    },
    {
      label: 'Centros Médicos',
      icon: MapIcon,
    },
  ];

  const renderItem = ({ label, icon: Icon, active }) => (
    <button
      key={label}
      type="button"
      className={`
        flex w-full items-center gap-3 rounded-xl px-3 py-2.5
        text-left text-sm transition

        ${
          active
            ? 'border border-[#5f8079] bg-white font-semibold text-[#244b54]'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }
      `}
    >
      <Icon className="h-5 w-5 shrink-0" />

      <span>{label}</span>
    </button>
  );

  return (
    <aside className="flex h-full  flex-col rounded-xl bg-white px-5 py-5 shadow-sm">
      <div className="flex-1">
        {/* INICIO */}
        <div>
          <p className="mb-2 text-xs font-bold text-slate-800">INICIO</p>

          <div className="space-y-1">{menuInicio.map(renderItem)}</div>
        </div>

        {/* ASEGURADO */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold text-slate-800">ASEGURADO</p>

          <div className="space-y-1">{menuAsegurado.map(renderItem)}</div>
        </div>

        {/* SERVICIOS */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold text-slate-800">
            SERVICIOS DISPONIBLES
          </p>

          <div className="space-y-1">{menuServicios.map(renderItem)}</div>
        </div>

        <div className="mt-3 border-b border-slate-200" />
      </div>

      {/* VERSION */}
      <div className="pt-6 text-center">
        <p className="text-xs font-semibold text-[#245249]">
          v1.0.12-01/08/2026
        </p>
      </div>
    </aside>
  );
}
