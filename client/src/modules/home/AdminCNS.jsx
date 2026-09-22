import { useState } from 'react';
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  EyeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  XCircleIcon,
  XMarkIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';

/* =========================================================
   DATOS MOCK
========================================================= */

const menu = [
  {
    id: 'dashboard',
    nombre: 'Inicio',
    icon: HomeIcon,
  },
  {
    id: 'fichas',
    nombre: 'Fichas médicas',
    icon: CalendarDaysIcon,
  },
  {
    id: 'pacientes',
    nombre: 'Asegurados',
    icon: UserGroupIcon,
  },
  {
    id: 'medicos',
    nombre: 'Médicos',
    icon: UsersIcon,
  },
  {
    id: 'especialidades',
    nombre: 'Especialidades',
    icon: ClipboardDocumentListIcon,
  },
  {
    id: 'establecimientos',
    nombre: 'Establecimientos',
    icon: BuildingOffice2Icon,
  },
  {
    id: 'reportes',
    nombre: 'Reportes',
    icon: DocumentChartBarIcon,
  },
  {
    id: 'configuracion',
    nombre: 'Configuración',
    icon: Cog6ToothIcon,
  },
];

const fichas = [
  {
    id: 1,
    nro: 'F-001245',
    paciente: 'Juan Carlos Pérez',
    ci: '8658154',
    especialidad: 'Medicina General',
    medico: 'Dra. María Fernández',
    fecha: '08/09/2026',
    hora: '08:30',
    estado: 'Reservada',
  },
  {
    id: 2,
    nro: 'F-001246',
    paciente: 'María López Pérez',
    ci: '7458214',
    especialidad: 'Ginecología',
    medico: 'Dra. Ana Vargas',
    fecha: '08/09/2026',
    hora: '09:00',
    estado: 'Atendida',
  },
  {
    id: 3,
    nro: 'F-001247',
    paciente: 'Mateo Pérez López',
    ci: '10245874',
    especialidad: 'Pediatría',
    medico: 'Dr. José Martínez',
    fecha: '08/09/2026',
    hora: '09:30',
    estado: 'Reservada',
  },
  {
    id: 4,
    nro: 'F-001248',
    paciente: 'Carlos Rodríguez',
    ci: '5369854',
    especialidad: 'Odontología',
    medico: 'Dr. Carlos Rojas',
    fecha: '08/09/2026',
    hora: '10:00',
    estado: 'Cancelada',
  },
  {
    id: 5,
    nro: 'F-001249',
    paciente: 'Ana Mendoza',
    ci: '6954782',
    especialidad: 'Medicina Interna',
    medico: 'Dr. Luis Flores',
    fecha: '08/09/2026',
    hora: '10:30',
    estado: 'Reservada',
  },
];

const pacientes = [
  {
    id: 1,
    nombre: 'Juan Carlos Pérez',
    ci: '8658154',
    codigo: 'SEG-000154',
    tipo: 'Titular',
    beneficiarios: 2,
    estado: 'Activo',
  },
  {
    id: 2,
    nombre: 'Roberto García',
    ci: '4856985',
    codigo: 'SEG-000221',
    tipo: 'Titular',
    beneficiarios: 3,
    estado: 'Activo',
  },
  {
    id: 3,
    nombre: 'Elena Flores',
    ci: '5269847',
    codigo: 'SEG-000287',
    tipo: 'Titular',
    beneficiarios: 1,
    estado: 'Activo',
  },
  {
    id: 4,
    nombre: 'Miguel Rojas',
    ci: '6958421',
    codigo: 'SEG-000315',
    tipo: 'Titular',
    beneficiarios: 0,
    estado: 'Inactivo',
  },
];

const medicos = [
  {
    id: 1,
    nombre: 'Dra. María Fernández',
    especialidad: 'Medicina General',
    matricula: 'MED-00154',
    fichas: 18,
    establecimiento: 'CIS AIQUILE',
  },
  {
    id: 2,
    nombre: 'Dra. Ana Vargas',
    especialidad: 'Ginecología',
    matricula: 'MED-00287',
    fichas: 15,
    establecimiento: 'CIS AIQUILE',
  },
  {
    id: 3,
    nombre: 'Dr. José Martínez',
    especialidad: 'Pediatría',
    matricula: 'MED-00354',
    fichas: 20,
    establecimiento: 'CIS AIQUILE',
  },
  {
    id: 4,
    nombre: 'Dr. Carlos Rojas',
    especialidad: 'Odontología',
    matricula: 'MED-00412',
    fichas: 16,
    establecimiento: 'CIS AIQUILE',
  },
];

const especialidades = [
  {
    id: 1,
    nombre: 'Medicina General',
    medicos: 8,
    fichasHoy: 52,
    estado: 'Activo',
  },
  {
    id: 2,
    nombre: 'Pediatría',
    medicos: 5,
    fichasHoy: 35,
    estado: 'Activo',
  },
  {
    id: 3,
    nombre: 'Ginecología',
    medicos: 4,
    fichasHoy: 28,
    estado: 'Activo',
  },
  {
    id: 4,
    nombre: 'Odontología',
    medicos: 6,
    fichasHoy: 40,
    estado: 'Activo',
  },
  {
    id: 5,
    nombre: 'Cardiología',
    medicos: 3,
    fichasHoy: 18,
    estado: 'Activo',
  },
];

export default function AdminCNS() {
  const [pagina, setPagina] = useState('dashboard');

  // Sidebar móvil
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar escritorio
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const cambiarPagina = (id) => {
    setPagina(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F8F8]">
      {/* =========================================
          SIDEBAR DESKTOP
      ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          hidden border-r border-slate-200 bg-white
          transition-all duration-300 ease-in-out
          lg:block
          ${sidebarCollapsed ? 'w-20' : 'w-72'}
        `}
      >
        <Sidebar
          pagina={pagina}
          cambiarPagina={cambiarPagina}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </aside>

      {/* =========================================
          OVERLAY MOBILE
      ========================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* =========================================
          SIDEBAR MOBILE
      ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 bg-white shadow-xl
          transition-transform duration-300
          lg:hidden

          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar
          pagina={pagina}
          cambiarPagina={cambiarPagina}
          collapsed={false}
          mobile
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* =========================================
          CONTENIDO
      ========================================== */}

      <div
        className={`
          min-h-screen
          transition-all duration-300
          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}
        `}
      >
        <HeaderAdmin
          abrirMenu={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {pagina === 'dashboard' && (
            <Dashboard cambiarPagina={cambiarPagina} />
          )}

          {pagina === 'fichas' && <Fichas />}

          {pagina === 'pacientes' && <Pacientes />}

          {pagina === 'medicos' && <Medicos />}

          {pagina === 'especialidades' && <Especialidades />}

          {pagina === 'establecimientos' && (
            <Placeholder
              titulo="Establecimientos"
              descripcion="Administre los centros y establecimientos de salud."
              icon={BuildingOffice2Icon}
            />
          )}

          {pagina === 'reportes' && <Reportes />}

          {pagina === 'configuracion' && (
            <Placeholder
              titulo="Configuración"
              descripcion="Configure parámetros generales del sistema."
              icon={Cog6ToothIcon}
            />
          )}
        </main>
      </div>
    </div>
  );
}
/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  pagina,
  cambiarPagina,
  collapsed = false,
  mobile = false,
  onToggle,
  onClose,
}) {
  return (
    <div className="flex h-full flex-col">
      {/* =========================================
          LOGO
      ========================================== */}

      <div
        className={`
          relative flex h-20 items-center
          border-b border-slate-100
          transition-all duration-300

          ${collapsed ? 'justify-center px-2' : 'px-6'}
        `}
      >
        <img
          src="/logo_cns.png"
          alt="Caja Nacional de Salud"
          className={`
            object-contain transition-all duration-300

            ${collapsed ? 'h-12 w-12' : 'h-14 w-14'}
          `}
        />

        {!collapsed && (
          <div className="ml-3 min-w-0">
            <h1 className="font-bold text-[#005B57]">CNS</h1>

            <p className="whitespace-nowrap text-xs text-slate-500">
              Panel administrativo
            </p>
          </div>
        )}

        {/* CERRAR MOBILE */}

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* =========================================
          MENÚ
      ========================================== */}

      <nav
        className={`
          flex-1 overflow-y-auto py-6

          ${collapsed ? 'px-2' : 'px-4'}
        `}
      >
        {!collapsed && (
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Administración
          </p>
        )}

        <div className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            const activo = pagina === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => cambiarPagina(item.id)}
                title={collapsed ? item.nombre : undefined}
                className={`
                  relative flex w-full items-center
                  rounded-xl text-sm font-medium
                  transition-all duration-200

                  ${collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-3'}

                  ${
                    activo
                      ? 'bg-[#EAF5F3] text-[#005B57]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <Icon
                  className={`
                    shrink-0
                    ${collapsed ? 'h-6 w-6' : 'h-5 w-5'}
                  `}
                />

                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.nombre}</span>

                    {activo && (
                      <div className="h-2 w-2 rounded-full bg-[#005B57]" />
                    )}
                  </>
                )}

                {/* INDICADOR CUANDO ESTÁ COLAPSADO */}

                {collapsed && activo && (
                  <span className="absolute right-0 h-6 w-1 rounded-l-full bg-[#005B57]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* =========================================
          USUARIO
      ========================================== */}

      <div
        className={`
          border-t border-slate-100

          ${collapsed ? 'p-2' : 'p-4'}
        `}
      >
        {!collapsed ? (
          <>
            {/* <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <Avatar nombre="Administrador CNS" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  Administrador
                </p>

                <p className="truncate text-xs text-slate-500">
                  admin@cns.gob.bo
                </p>
              </div>
            </div> */}

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            type="button"
            title="Cerrar sesión"
            className="flex w-full justify-center rounded-xl p-3 text-red-500 transition hover:bg-red-50"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* =========================================
          BOTÓN COLAPSAR DESKTOP
      ========================================== */}

      {!mobile && (
        <button
          type="button"
          onClick={onToggle}
          title={collapsed ? 'Expandir menú' : 'Contraer menú'}
          className="
            absolute
            -right-4
            top-24
            hidden
            h-8 w-8
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-slate-500
            shadow-sm
            transition
            hover:border-[#005B57]
            hover:bg-[#EAF5F3]
            hover:text-[#005B57]
            lg:flex
          "
        >
          {collapsed ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function HeaderAdmin({ abrirMenu, sidebarCollapsed, toggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* IZQUIERDA */}

        <div className="flex items-center gap-3">
          {/* MOBILE */}

          <button
            type="button"
            onClick={abrirMenu}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* DESKTOP */}

          <button
            type="button"
            onClick={toggleSidebar}
            title={sidebarCollapsed ? 'Expandir menú' : 'Contraer menú'}
            className="hidden rounded-xl p-2.5 text-slate-500 transition hover:bg-[#EAF5F3] hover:text-[#005B57] lg:flex"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>

          <div>
            <p className="hidden text-xs font-semibold uppercase tracking-wide text-[#005B57] sm:block">
              Caja Nacional de Salud
            </p>

            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Sistema de fichas médicas
            </h2>
          </div>
        </div>

        {/* DERECHA */}

        <div className="flex items-center gap-2 sm:gap-4">
          {/* BUSCADOR */}

          <div className="relative hidden md:block">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Buscar..."
              className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-[#005B57] focus:bg-white focus:ring-4 focus:ring-[#EAF5F3]"
            />
          </div>

          {/* NOTIFICACIONES */}

          <button
            type="button"
            className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50"
          >
            <BellIcon className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* USUARIO */}

          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">
                Administrador
              </p>

              <p className="text-xs text-slate-500">Sistema</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5F3]">
              <UserIcon className="h-5 w-5 text-[#005B57]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ cambiarPagina }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#005B57]">
            Resumen general
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Panel administrativo
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Información de la atención médica del día.
          </p>
        </div>

        <button
          onClick={() => cambiarPagina('fichas')}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#005B57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004744]"
        >
          <PlusIcon className="h-5 w-5" />
          Nueva ficha
        </button>
      </div>

      {/* ESTADÍSTICAS */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          titulo="Fichas de hoy"
          valor="153"
          detalle="+12% respecto ayer"
          icon={CalendarDaysIcon}
        />

        <StatCard
          titulo="Atendidos"
          valor="87"
          detalle="56.8% completado"
          icon={CheckCircleIcon}
        />

        <StatCard
          titulo="Pendientes"
          valor="58"
          detalle="Esperando atención"
          icon={ClockIcon}
        />

        <StatCard
          titulo="Canceladas"
          valor="8"
          detalle="5.2% del total"
          icon={XCircleIcon}
        />
      </div>

      {/* SEGUNDA FILA */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
            <div>
              <h3 className="font-bold text-slate-900">Fichas de hoy</h3>

              <p className="mt-1 text-sm text-slate-500">
                Últimas reservas registradas.
              </p>
            </div>

            <button
              onClick={() => cambiarPagina('fichas')}
              className="flex items-center gap-1 text-sm font-semibold text-[#005B57]"
            >
              Ver todas
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-190">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <Th>Paciente</Th>
                  <Th>Especialidad</Th>
                  <Th>Hora</Th>
                  <Th>Estado</Th>
                  <Th></Th>
                </tr>
              </thead>

              <tbody>
                {fichas.slice(0, 5).map((ficha) => (
                  <tr
                    key={ficha.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <Td>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {ficha.paciente}
                        </p>

                        <p className="text-xs text-slate-400">CI {ficha.ci}</p>
                      </div>
                    </Td>

                    <Td>{ficha.especialidad}</Td>

                    <Td>
                      <span className="font-semibold">{ficha.hora}</span>
                    </Td>

                    <Td>
                      <Estado estado={ficha.estado} />
                    </Td>

                    <Td>
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-[#EAF5F3] hover:text-[#005B57]">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ACTIVIDAD */}

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Capacidad de hoy</h3>

            <p className="mt-1 text-sm text-slate-500">Fichas disponibles.</p>

            <div className="mt-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-3xl font-bold text-slate-900">153</span>

                  <span className="ml-2 text-sm text-slate-400">/ 220</span>
                </div>

                <span className="text-sm font-semibold text-[#005B57]">
                  69%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[69%] rounded-full bg-[#005B57]" />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                67 fichas todavía disponibles.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Accesos rápidos</h3>

            <div className="mt-4 space-y-2">
              <AccesoRapido
                icon={CalendarDaysIcon}
                texto="Gestionar fichas"
                onClick={() => cambiarPagina('fichas')}
              />

              <AccesoRapido
                icon={UserGroupIcon}
                texto="Buscar asegurado"
                onClick={() => cambiarPagina('pacientes')}
              />

              <AccesoRapido
                icon={UsersIcon}
                texto="Gestionar médicos"
                onClick={() => cambiarPagina('medicos')}
              />

              <AccesoRapido
                icon={DocumentChartBarIcon}
                texto="Ver reportes"
                onClick={() => cambiarPagina('reportes')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ESPECIALIDADES */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h3 className="font-bold text-slate-900">
            Atención por especialidad
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Fichas programadas para hoy.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {especialidades.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
                <ClipboardDocumentListIcon className="h-5 w-5" />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">
                {item.nombre}
              </p>

              <p className="mt-1 text-2xl font-bold text-[#005B57]">
                {item.fichasHoy}
              </p>

              <p className="text-xs text-slate-400">fichas</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FICHAS
========================================================= */

function Fichas() {
  return (
    <ModuloLayout
      titulo="Fichas médicas"
      descripcion="Gestione las reservas y fichas médicas."
      boton="Nueva ficha"
    >
      <Filtros />

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-262.5">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left">
                <Th>N° ficha</Th>
                <Th>Paciente</Th>
                <Th>Especialidad</Th>
                <Th>Médico</Th>
                <Th>Fecha</Th>
                <Th>Hora</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>

            <tbody>
              {fichas.map((ficha) => (
                <tr
                  key={ficha.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <Td>
                    <span className="font-semibold text-[#005B57]">
                      {ficha.nro}
                    </span>
                  </Td>

                  <Td>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {ficha.paciente}
                      </p>

                      <p className="text-xs text-slate-400">CI: {ficha.ci}</p>
                    </div>
                  </Td>

                  <Td>{ficha.especialidad}</Td>
                  <Td>{ficha.medico}</Td>
                  <Td>{ficha.fecha}</Td>
                  <Td>{ficha.hora}</Td>

                  <Td>
                    <Estado estado={ficha.estado} />
                  </Td>

                  <Td>
                    <Acciones />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModuloLayout>
  );
}

/* =========================================================
   PACIENTES
========================================================= */

function Pacientes() {
  return (
    <ModuloLayout
      titulo="Asegurados"
      descripcion="Consulte asegurados titulares y sus beneficiarios."
      boton="Nuevo asegurado"
    >
      <Filtros placeholder="Buscar por nombre, CI o código..." />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pacientes.map((paciente) => (
          <div
            key={paciente.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <Avatar nombre={paciente.nombre} />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {paciente.nombre}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      CI: {paciente.ci}
                    </p>
                  </div>

                  <Estado estado={paciente.estado} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <MiniDato label="Código" value={paciente.codigo} />

                  <MiniDato
                    label="Beneficiarios"
                    value={paciente.beneficiarios}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#005B57] hover:text-[#005B57]">
                <EyeIcon className="h-4 w-4" />
                Ver
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl bg-[#005B57] py-2.5 text-sm font-semibold text-white hover:bg-[#004744]">
                <CalendarDaysIcon className="h-4 w-4" />
                Ficha
              </button>
            </div>
          </div>
        ))}
      </div>
    </ModuloLayout>
  );
}

/* =========================================================
   MÉDICOS
========================================================= */

function Medicos() {
  return (
    <ModuloLayout
      titulo="Médicos"
      descripcion="Administre médicos, especialidades y disponibilidad."
      boton="Nuevo médico"
    >
      <Filtros placeholder="Buscar médico..." />

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="bg-slate-50 text-left">
                <Th>Médico</Th>
                <Th>Especialidad</Th>
                <Th>Matrícula</Th>
                <Th>Establecimiento</Th>
                <Th>Fichas/día</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>

            <tbody>
              {medicos.map((medico) => (
                <tr key={medico.id} className="border-t border-slate-100">
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar nombre={medico.nombre} />

                      <span className="font-semibold text-slate-800">
                        {medico.nombre}
                      </span>
                    </div>
                  </Td>

                  <Td>{medico.especialidad}</Td>

                  <Td>{medico.matricula}</Td>

                  <Td>{medico.establecimiento}</Td>

                  <Td>
                    <span className="font-semibold">{medico.fichas}</span>
                  </Td>

                  <Td>
                    <Acciones />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModuloLayout>
  );
}

/* =========================================================
   ESPECIALIDADES
========================================================= */

function Especialidades() {
  return (
    <ModuloLayout
      titulo="Especialidades"
      descripcion="Administre las especialidades disponibles."
      boton="Nueva especialidad"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {especialidades.map((especialidad) => (
          <div
            key={especialidad.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
                <ClipboardDocumentListIcon className="h-6 w-6" />
              </div>

              <Estado estado={especialidad.estado} />
            </div>

            <h3 className="mt-5 font-bold text-slate-900">
              {especialidad.nombre}
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <MiniDato label="Médicos" value={especialidad.medicos} />

              <MiniDato label="Fichas hoy" value={especialidad.fichasHoy} />
            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#005B57] hover:text-[#005B57]">
              <PencilSquareIcon className="h-4 w-4" />
              Editar especialidad
            </button>
          </div>
        ))}
      </div>
    </ModuloLayout>
  );
}

/* =========================================================
   REPORTES
========================================================= */

function Reportes() {
  const reportes = [
    {
      titulo: 'Fichas por fecha',
      descripcion: 'Reporte de fichas reservadas, atendidas y canceladas.',
      icon: CalendarDaysIcon,
    },
    {
      titulo: 'Atención por médico',
      descripcion: 'Detalle de atenciones realizadas por profesional.',
      icon: UsersIcon,
    },
    {
      titulo: 'Atención por especialidad',
      descripcion: 'Resumen de la demanda por cada especialidad.',
      icon: ClipboardDocumentListIcon,
    },
    {
      titulo: 'Asegurados atendidos',
      descripcion: 'Reporte de asegurados y beneficiarios atendidos.',
      icon: UserGroupIcon,
    },
    {
      titulo: 'Capacidad de atención',
      descripcion: 'Disponibilidad y ocupación de fichas médicas.',
      icon: ChartBarIcon,
    },
    {
      titulo: 'Reporte general',
      descripcion: 'Resumen consolidado del sistema de fichas.',
      icon: DocumentChartBarIcon,
    },
  ];

  return (
    <ModuloLayout
      titulo="Reportes"
      descripcion="Consulte y genere información administrativa."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reportes.map((reporte) => {
          const Icon = reporte.icon;

          return (
            <button
              key={reporte.titulo}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#005B57] hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                {reporte.titulo}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {reporte.descripcion}
              </p>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#005B57]">
                Generar reporte
                <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </ModuloLayout>
  );
}

/* =========================================================
   COMPONENTES COMUNES
========================================================= */

function ModuloLayout({ titulo, descripcion, boton, children }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#005B57]">Administración</p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            {titulo}
          </h1>

          <p className="mt-2 text-sm text-slate-500">{descripcion}</p>
        </div>

        {boton && (
          <button className="flex items-center justify-center gap-2 rounded-xl bg-[#005B57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004744]">
            <PlusIcon className="h-5 w-5" />
            {boton}
          </button>
        )}
      </div>

      {children}
    </div>
  );
}

function Filtros({ placeholder = 'Buscar ficha o paciente...' }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#005B57] focus:ring-4 focus:ring-[#EAF5F3]"
        />
      </div>

      <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-[#005B57]">
        <option>Todos los estados</option>
        <option>Reservada</option>
        <option>Atendida</option>
        <option>Cancelada</option>
      </select>

      <input
        type="date"
        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-[#005B57]"
      />
    </div>
  );
}

function StatCard({ titulo, valor, detalle, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{titulo}</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">{valor}</p>

          <p className="mt-2 text-xs text-slate-400">{detalle}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function Estado({ estado }) {
  const estilos = {
    Reservada: 'bg-amber-100 text-amber-700',
    Atendida: 'bg-emerald-100 text-emerald-700',
    Cancelada: 'bg-red-100 text-red-700',
    Activo: 'bg-emerald-100 text-emerald-700',
    Inactivo: 'bg-slate-100 text-slate-500',
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        estilos[estado] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {estado}
    </span>
  );
}

function Acciones() {
  return (
    <div className="flex items-center gap-1">
      <button
        title="Ver"
        className="rounded-lg p-2 text-slate-400 hover:bg-[#EAF5F3] hover:text-[#005B57]"
      >
        <EyeIcon className="h-5 w-5" />
      </button>

      <button
        title="Editar"
        className="rounded-lg p-2 text-slate-400 hover:bg-[#EAF5F3] hover:text-[#005B57]"
      >
        <PencilSquareIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

function AccesoRapido({ icon: Icon, texto, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#EAF5F3]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF5F3] text-[#005B57]">
        <Icon className="h-5 w-5" />
      </div>

      <span className="flex-1 text-sm font-semibold text-slate-700">
        {texto}
      </span>

      <ChevronRightIcon className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function Avatar({ nombre }) {
  const iniciales = nombre
    .split(' ')
    .slice(0, 2)
    .map((item) => item[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF5F3] text-sm font-bold text-[#005B57]">
      {iniciales}
    </div>
  );
}

function MiniDato({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-400">{label}</p>

      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
      {children}
    </th>
  );
}

function Td({ children }) {
  return <td className="px-5 py-4 text-sm text-slate-600">{children}</td>;
}

/* =========================================================
   PLACEHOLDER
========================================================= */

function Placeholder({ titulo, descripcion, icon: Icon }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="text-sm font-semibold text-[#005B57]">Administración</p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">{titulo}</h1>

        <p className="mt-2 text-slate-500">{descripcion}</p>
      </div>

      <div className="mt-8 flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF5F3] text-[#005B57]">
          <Icon className="h-8 w-8" />
        </div>

        <h3 className="mt-5 font-bold text-slate-800">Módulo de {titulo}</h3>

        <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
          Esta sección está preparada para continuar desarrollando el flujo
          administrativo.
        </p>
      </div>
    </div>
  );
}
