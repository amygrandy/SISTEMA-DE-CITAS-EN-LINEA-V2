import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  UserIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

export default function PacienteLayout() {
  return (
    <div className="min-h-screen bg-[#F7F9F9]">
      <Header />
      <Outlet />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { usuario, logout } = useAuth();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white">
            <img
              src="/logo_cns.png"
              alt="Caja Nacional de Salud"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-base font-bold text-[#005B57] sm:text-lg">
              Caja Nacional de Salud
            </h1>

            <p className="text-xs text-slate-500">Portal del asegurado</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50"
            >
              <div className="hidden text-right sm:block">
                <p className="max-w-60 truncate text-sm font-semibold text-slate-800">
                  {`  ${usuario?.nombres || ''} ${usuario?.apellido_paterno || ''} ${usuario?.apellido_materno || ''}`}
                </p>

                <p className="text-xs text-slate-500">Asegurado titular</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5F3]">
                <UserIcon className="h-5 w-5 text-[#005B57]" />
              </div>

              <ChevronDownIcon
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Sesión actual
                  </p>

                  <p className="mt-1 wrap-break-words text-sm font-semibold text-slate-800">
                    {`  ${usuario?.nombres || ''} ${usuario?.apellido_paterno || ''} ${usuario?.apellido_materno || ''}`}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Asegurado titular
                  </p>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Cerrar sesión
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
