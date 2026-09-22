import {
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { NavLink } from 'react-router-dom';

import { menu } from './menu';

export default function Sidebar({
  collapsed = false,
  mobile = false,
  onToggle,
  onClose,
}) {
  return (
    <div className="flex h-full flex-col">
      {/* LOGO */}

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

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              rounded-lg p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* MENÚ */}

      <nav
        className={`
          flex-1 overflow-y-auto py-6
          ${collapsed ? 'px-2' : 'px-4'}
        `}
      >
        {!collapsed && (
          <p
            className="
            mb-3 px-3
            text-xs font-bold
            uppercase tracking-wider
            text-slate-400
          "
          >
            Administración
          </p>
        )}

        <div className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => {
                  if (mobile) {
                    onClose?.();
                  }
                }}
                title={collapsed ? item.nombre : undefined}
                className={({ isActive }) => `
                  relative flex w-full items-center
                  rounded-xl text-sm font-medium
                  transition-all duration-200

                  ${collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-3'}

                  ${
                    isActive
                      ? 'bg-[#EAF5F3] text-[#005B57]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`
                        shrink-0
                        ${collapsed ? 'h-6 w-6' : 'h-5 w-5'}
                      `}
                    />

                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.nombre}</span>

                        {isActive && (
                          <div
                            className="
                            h-2 w-2
                            rounded-full
                            bg-[#005B57]
                          "
                          />
                        )}
                      </>
                    )}

                    {collapsed && isActive && (
                      <span
                        className="
                        absolute right-0
                        h-6 w-1
                        rounded-l-full
                        bg-[#005B57]
                      "
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* CERRAR SESIÓN */}

      <div
        className={`
          border-t border-slate-100
          ${collapsed ? 'p-2' : 'p-4'}
        `}
      >
        {!collapsed ? (
          <button
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-xl
              px-3 py-2.5
              text-sm font-medium
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Cerrar sesión
          </button>
        ) : (
          <button
            type="button"
            title="Cerrar sesión"
            className="
              flex w-full justify-center
              rounded-xl p-3
              text-red-500
              transition
              hover:bg-red-50
            "
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* BOTÓN COLAPSAR */}

      {!mobile && (
        <button
          type="button"
          onClick={onToggle}
          title={collapsed ? 'Expandir menú' : 'Contraer menú'}
          className="
            absolute -right-4 top-24
            hidden h-8 w-8
            items-center justify-center
            rounded-full
            border border-slate-200
            bg-white text-slate-500
            shadow-sm transition
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
