import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext.admin';

export default function HeaderAdmin({
  abrirMenu,
  sidebarCollapsed,
  toggleSidebar,
}) {
  const navigate = useNavigate();

  const [menuUsuarioOpen, setMenuUsuarioOpen] = useState(false);

  const { logout } = useAuth();
  const menuUsuarioRef = useRef(null);

  // Cerrar el dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuUsuarioRef.current &&
        !menuUsuarioRef.current.contains(event.target)
      ) {
        setMenuUsuarioOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePerfil = () => {
    setMenuUsuarioOpen(false);

    // Cuando tengas esta ruta
    navigate('/admin/perfil');
  };

  const handleConfiguracion = () => {
    setMenuUsuarioOpen(false);

    navigate('/admin/configuracion');
  };

  const handleCerrarSesion = () => {
    setMenuUsuarioOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-slate-200
        bg-white/95
        backdrop-blur
      "
    >
      <div
        className="
          flex h-20
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* =========================================
            IZQUIERDA
        ========================================== */}

        <div className="flex items-center gap-3">
          {/* BOTÓN MOBILE */}

          <button
            type="button"
            onClick={abrirMenu}
            className="
              rounded-xl p-2
              text-slate-500
              transition
              hover:bg-slate-100
              lg:hidden
            "
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* BOTÓN DESKTOP */}

          <button
            type="button"
            onClick={toggleSidebar}
            title={sidebarCollapsed ? 'Expandir menú' : 'Contraer menú'}
            className="
              hidden rounded-xl p-2.5
              text-slate-500
              transition
              hover:bg-[#EAF5F3]
              hover:text-[#005B57]
              lg:flex
            "
          >
            <Bars3Icon className="h-5 w-5" />
          </button>

          {/* TÍTULO */}

          <div>
            <p
              className="
                hidden text-xs
                font-semibold uppercase tracking-wide
                text-[#005B57]
                sm:block
              "
            >
              Caja Nacional de Salud
            </p>

            <h2
              className="
                text-base font-bold
                text-slate-900
                sm:text-lg
              "
            >
              Sistema de fichas médicas
            </h2>
          </div>
        </div>

        {/* =========================================
            DERECHA
        ========================================== */}

        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className="
              hidden h-8 w-px
              bg-slate-200
              sm:block
            "
          />

          {/* =========================================
              USUARIO + DROPDOWN
          ========================================== */}

          <div ref={menuUsuarioRef} className="relative hidden sm:block">
            {/* BOTÓN USUARIO */}

            <button
              type="button"
              onClick={() => setMenuUsuarioOpen((prev) => !prev)}
              className="
                flex items-center gap-3
                rounded-xl
                px-2 py-2
                transition
                hover:bg-slate-50
              "
            >
              {/* INFORMACIÓN */}

              <div className="text-right">
                <p
                  className="
                    text-sm font-semibold
                    text-slate-800
                  "
                >
                  Administrador
                </p>

                <p className="text-xs text-slate-500">Sistema</p>
              </div>

              {/* AVATAR */}

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-[#EAF5F3]
                "
              >
                <UserIcon
                  className="
                    h-5 w-5
                    text-[#005B57]
                  "
                />
              </div>

              {/* FLECHA */}

              <ChevronDownIcon
                className={`
                  h-4 w-4
                  text-slate-400
                  transition-transform
                  duration-200

                  ${menuUsuarioOpen ? 'rotate-180' : ''}
                `}
              />
            </button>

            {/* =========================================
                MENÚ DESPLEGABLE
            ========================================== */}

            {menuUsuarioOpen && (
              <div
                className="
                  absolute right-0 top-full
                  z-50
                  mt-2
                  w-64
                  overflow-hidden
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  shadow-xl
                "
              >
                {/* INFORMACIÓN DEL USUARIO */}

                <div
                  className="
                    border-b border-slate-100
                    px-4 py-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex h-11 w-11
                        shrink-0
                        items-center justify-center
                        rounded-full
                        bg-[#EAF5F3]
                      "
                    >
                      <UserIcon className="h-5 w-5 text-[#005B57]" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm font-semibold
                          text-slate-800
                        "
                      >
                        Administrador
                      </p>

                      <p
                        className="
                          truncate
                          text-xs
                          text-slate-500
                        "
                      >
                        administrador@cns.gob.bo
                      </p>
                    </div>
                  </div>
                </div>

                {/* OPCIONES */}

                <div className="p-2">
                  {/* PERFIL */}

                  {/* <button
                    type="button"
                    onClick={handlePerfil}
                    className="
                      flex w-full
                      items-center gap-3
                      rounded-xl
                      px-3 py-2.5
                      text-left
                      text-sm
                      text-slate-600
                      transition
                      hover:bg-slate-50
                      hover:text-slate-900
                    "
                  >
                    <UserCircleIcon className="h-5 w-5" />

                    <span className="flex-1">Mi perfil</span>
                  </button> */}

                  {/* CONFIGURACIÓN */}

                  {/* <button
                    type="button"
                    onClick={handleConfiguracion}
                    className="
                      flex w-full
                      items-center gap-3
                      rounded-xl
                      px-3 py-2.5
                      text-left
                      text-sm
                      text-slate-600
                      transition
                      hover:bg-slate-50
                      hover:text-slate-900
                    "
                  >
                    <Cog6ToothIcon className="h-5 w-5" />

                    <span className="flex-1">Configuración</span>
                  </button> */}
                </div>

                {/* CERRAR SESIÓN */}

                <div
                  className="
                    border-t border-slate-100
                    p-2
                  "
                >
                  <button
                    type="button"
                    onClick={handleCerrarSesion}
                    className="
                      flex w-full
                      items-center gap-3
                      rounded-xl
                      px-3 py-2.5
                      text-left
                      text-sm font-medium
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />

                    <span className="flex-1">Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
