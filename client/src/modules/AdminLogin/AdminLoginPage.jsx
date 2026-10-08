import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

import { toast } from 'react-toastify';
import { LoginServices } from './login.services';
import { useAuth } from '../../context/AuthContext.admin';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(event.currentTarget);

      const usuario = formData.get('usuario');
      const contrasenia = formData.get('contrasenia');

      const response = await LoginServices.InicioSesion({
        payload: {
          nombre_usuario: usuario,
          contrasenia,
        },
      });

      if (!response.ok) {
        throw new Error(response.message || 'Usuario o contraseña incorrectos');
      }

      if (response.data.usuario.rol !== 'super_admin') {
        throw new Error(
          'El usuario no tiene permisos para acceder al panel administrativo',
        );
      }

      localStorage.setItem('token', response.data.token);

      login(response.data.usuario);

      navigate('/admin');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error, inténtelo nuevamente',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* PANEL IZQUIERDO */}
      <section className="relative hidden min-h-screen overflow-hidden bg-linear-to-br from-[#163D38] via-[#24534C] to-[#102F2B] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        {/* Decoraciones */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5" />

        <div className="absolute -bottom-40 -right-32 h-120 w-120 rounded-full bg-white/5" />

        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* CABECERA */}
        <header className="relative z-10 flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-xl shadow-black/10">
            <img
              src="/logo_cns.png"
              alt="Logo CNS"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
              Caja Nacional de Salud
            </p>

            <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
              Sistema de Fichas
            </h1>

            <p className="mt-0.5 text-sm text-emerald-100/80">
              Panel administrativo
            </p>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="relative z-10 max-w-xl">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <ShieldCheckIcon className="h-9 w-9 text-emerald-200" />
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Gestión del sistema
            <span className="mt-1 block text-emerald-200">
              de fichas médicas.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-50/80">
            Accede al panel de administración para gestionar configuraciones,
            cupos, consultorios y fichas.
          </p>

          <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
              Acceso restringido
            </p>

            <p className="mt-2 text-sm leading-6 text-emerald-50">
              Este apartado está destinado únicamente al personal autorizado.
            </p>
          </div>
        </div>

        <footer className="relative z-10 text-xs text-emerald-100/60">
          © 2026 Caja Nacional de Salud
        </footer>
      </section>

      {/* PANEL DERECHO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-white via-[#F7FAF9] to-[#EDF5F2] px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24534C]/5 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative z-10 w-full max-w-lg">
          {/* LOGO MOBILE */}
          <div className="mb-8 flex items-center gap-4 lg:hidden">
            <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
              <img
                src="/logo_cns.png"
                alt="Logo CNS"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#24534C]">
                Caja Nacional de Salud
              </p>

              <h1 className="mt-1 text-lg font-bold text-slate-900">
                Administración
              </h1>
            </div>
          </div>

          {/* TARJETA */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-2xl shadow-slate-200/80 sm:p-10">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mb-7 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#24534C]"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver al acceso de pacientes
            </button>

            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F1EF]">
                <ShieldCheckIcon className="h-6 w-6 text-[#24534C]" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                ADMINISTRACIÓN
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                INGRESE SU USUARIO Y CONTRASEÑA PARA ACCEDER AL PANEL
                ADMINISTRATIVO
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* USUARIO */}
              <div>
                <label
                  htmlFor="usuario"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  USUARIO
                </label>

                <div className="group relative">
                  <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition group-focus-within:text-[#24534C]" />

                  <input
                    id="usuario"
                    name="usuario"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="INGRESE SU USUARIO"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#24534C] focus:bg-white focus:ring-4 focus:ring-[#24534C]/10"
                  />
                </div>
              </div>

              {/* CONTRASEÑA */}
              <div>
                <label
                  htmlFor="contrasenia"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  CONTRASEÑA
                </label>

                <div className="group relative">
                  <LockClosedIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition group-focus-within:text-[#24534C]" />

                  <input
                    id="contrasenia"
                    name="contrasenia"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="INGRESE SU CONTRASEÑA"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-12 pr-13 text-sm font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#24534C] focus:bg-white focus:ring-4 focus:ring-[#24534C]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-[#E8F1EF] hover:text-[#24534C]"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-[#24534C] px-5 text-sm font-semibold text-white shadow-lg shadow-[#24534C]/20 transition hover:-translate-y-0.5 hover:bg-[#193F3A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShieldCheckIcon className="h-5 w-5" />

                {loading ? 'INGRESANDO...' : 'INGRESAR AL PANEL'}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center lg:hidden">
            <p className="text-xs text-slate-400">
              © 2026 Caja Nacional de Salud
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
