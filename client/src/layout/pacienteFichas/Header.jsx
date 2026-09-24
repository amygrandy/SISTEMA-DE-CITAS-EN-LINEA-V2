import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Bars3Icon,
  UserIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { useAuth } from '../../context/AuthContext';

export default function Header({ onMenu }) {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { usuario } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const irPerfil = () => {
    setUserMenuOpen(false);

    navigate('/paciente/perfil');
  };

  const cerrarSesion = () => {
    setUserMenuOpen(false);

    // Aquí puedes limpiar tu sesión
    localStorage.removeItem('token');

    navigate('/', {
      replace: true,
    });
  };

  return (
    <header className="flex h-16 items-center justify-between bg-[#064135] px-4 text-white shadow-sm sm:px-6">
      {/* IZQUIERDA */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-8">
        {/* LOGO */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="hidden truncate text-xl font-medium md:block">
            Caja Nacional de Salud
          </h1>
        </div>

        {/* SIDEBAR */}
        <button
          type="button"
          onClick={onMenu}
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-lg
            transition
            hover:bg-white/10
          "
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
      </div>

      {/* DERECHA */}
      <div ref={dropdownRef} className="relative">
        {/* BOTÓN USUARIO */}
        <button
          type="button"
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="
            flex items-center gap-3
            rounded-xl
            px-2 py-1.5
            transition
            hover:bg-white/10
          "
        >
          {/* INFORMACIÓN */}
          <div className="hidden text-right leading-tight sm:block">
            <p className="max-w-60 truncate text-sm font-medium">
              {`${usuario?.nombres ?? ''} ${usuario?.apellido_paterno ?? ''} ${usuario?.apellido_materno ?? ''}`}
            </p>

            {/* <p className="text-xs text-white/80">elvis.chavez</p> */}
          </div>

          {/* AVATAR */}
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl bg-white/10
            "
          >
            <UserIcon className="h-6 w-6" />
          </div>

          <ChevronDownIcon
            className={`
              hidden h-4 w-4 shrink-0
              transition-transform duration-200
              sm:block
              ${userMenuOpen ? 'rotate-180' : ''}
            `}
          />
        </button>

        {/* DROPDOWN */}
        <div
          className={`
            absolute right-0 top-full z-50
            mt-3 w-72
            origin-top-right
            overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white
            text-slate-700
            shadow-xl

            transition-all duration-200

            ${
              userMenuOpen
                ? 'visible translate-y-0 scale-100 opacity-100'
                : 'invisible -translate-y-2 scale-95 opacity-0'
            }
          `}
        >
          {/* OPCIONES */}
          <div className="p-2">
            {/* PERFIL */}
            <button
              type="button"
              onClick={irPerfil}
              className="
                flex w-full items-center gap-3
                rounded-xl px-3 py-3
                text-left
                transition
                hover:bg-slate-50
              "
            >
              <div
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-[#edf4f2]
                  text-[#245249]
                "
              >
                <UserIcon className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Mi perfil
                </p>

                <p className="text-xs text-slate-400">
                  Ver información personal
                </p>
              </div>
            </button>

            <div className="my-2 border-t border-slate-100" />

            {/* LOGOUT */}
            <button
              type="button"
              onClick={cerrarSesion}
              className="
                flex w-full items-center gap-3
                rounded-xl px-3 py-3
                text-left
                transition
                hover:bg-rose-50
              "
            >
              <div
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-rose-50
                  text-rose-600
                "
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-rose-600">
                  Cerrar sesión
                </p>

                <p className="text-xs text-slate-400">Salir de tu cuenta</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
