import { useState } from 'react';

import {
  CalendarDaysIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  IdentificationIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  TicketIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export default function Login() {
  const [showCedula, setShowCedula] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Más adelante conectaremos aquí tu API.
    console.log('Iniciar sesión');
  };

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* ====================================================== */}
      {/* PANEL IZQUIERDO */}
      {/* ====================================================== */}

      <section className="relative hidden min-h-screen overflow-hidden bg-linear-to-br from-[#163D38] via-[#24534C] to-[#102F2B] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        {/* Decoraciones de fondo */}

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5" />

        <div className="absolute -bottom-40 -right-32 h-120 w-120 rounded-full bg-white/5" />

        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />

        {/* Patrón de puntos */}

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* ====================================================== */}
        {/* CABECERA */}
        {/* ====================================================== */}

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
              Atención médica organizada
            </p>
          </div>
        </header>

        {/* ====================================================== */}
        {/* CONTENIDO PRINCIPAL */}
        {/* ====================================================== */}

        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Tu atención médica,
            <span className="mt-1 block text-emerald-200">
              más simple y rápida.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-50/80">
            Consulta la disponibilidad de atención, reserva tu ficha y revisa
            tus próximas consultas desde un solo lugar.
          </p>

          {/* Beneficios */}

          <div className="mt-9 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <CheckCircleIcon className="h-5 w-5 text-emerald-200" />
              </div>

              <p className="text-sm text-emerald-50">
                Reserva tu ficha en pocos pasos.
              </p>
            </div>
          </div>

          {/* Tarjetas inferiores */}

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition duration-200 hover:bg-white/15">
              <CalendarDaysIcon className="mb-4 h-7 w-7 text-emerald-200" />

              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
                Disponibilidad
              </p>

              <p className="mt-1 font-semibold text-white">Consulta horarios</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition duration-200 hover:bg-white/15">
              <TicketIcon className="mb-4 h-7 w-7 text-emerald-200" />

              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
                Atención
              </p>

              <p className="mt-1 font-semibold text-white">Reserva tu ficha</p>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* FOOTER */}
        {/* ====================================================== */}

        <footer className="relative z-10 flex items-center justify-between text-xs text-emerald-100/60">
          <p>© 2026 Caja Nacional de Salud</p>
        </footer>
      </section>

      {/* ====================================================== */}
      {/* PANEL DERECHO */}
      {/* ====================================================== */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-white via-[#F7FAF9] to-[#EDF5F2] px-5 py-10 sm:px-8 lg:px-12">
        {/* Decoraciones */}

        <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24534C]/5 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative z-10 w-full max-w-lg">
          {/* ====================================================== */}
          {/* LOGO MOBILE */}
          {/* ====================================================== */}

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
                Sistema de Fichas
              </h1>

              <p className="text-xs text-slate-500">
                Atención médica organizada
              </p>
            </div>
          </div>

          {/* ====================================================== */}
          {/* TARJETA DE LOGIN */}
          {/* ====================================================== */}

          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-2xl shadow-slate-200/80 sm:p-10">
            {/* Encabezado */}

            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                BIENVENIDO
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                INGRESAR TU MATRICULA Y CEDULA DE IDENTIDAD PARA ACCEDER AL
                SISTEMA DE FICHAS
              </p>
            </div>

            {/* ====================================================== */}
            {/* FORMULARIO */}
            {/* ====================================================== */}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* MATRÍCULA */}

              <div>
                <label
                  htmlFor="matricula"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  MATRICULA
                </label>

                <div className="group relative">
                  <IdentificationIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition duration-200 group-focus-within:text-[#24534C]" />

                  <input
                    id="matricula"
                    name="matricula"
                    type="text"
                    autoComplete="username"
                    placeholder="INGRESA TU MATRICULA"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#24534C] focus:bg-white focus:ring-4 focus:ring-[#24534C]/10"
                  />
                </div>
              </div>

              {/* CÉDULA */}

              <div>
                <label
                  htmlFor="cedula"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  CEDULA DE INDENTIDAD
                </label>

                <div className="group relative">
                  <LockClosedIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition duration-200 group-focus-within:text-[#24534C]" />

                  <input
                    id="cedula"
                    name="cedula"
                    type={showCedula ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="INGRESA TU CEDULA"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-12 pr-13 text-sm font-medium text-slate-800 outline-none transition duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#24534C] focus:bg-white focus:ring-4 focus:ring-[#24534C]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCedula((value) => !value)}
                    aria-label={
                      showCedula
                        ? 'Ocultar cédula de identidad'
                        : 'Mostrar cédula de identidad'
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition duration-200 hover:bg-[#E8F1EF] hover:text-[#24534C]"
                  >
                    {showCedula ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* BOTÓN */}

              <button
                type="submit"
                className="group flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-[#24534C] px-5 text-sm font-semibold text-white shadow-lg shadow-[#24534C]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#193F3A] hover:shadow-xl hover:shadow-[#24534C]/25 focus:outline-none focus:ring-4 focus:ring-[#24534C]/20 active:translate-y-0 active:scale-[0.99]"
              >
                <UserIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                INICIAR SESION
              </button>
            </form>
          </div>

          {/* FOOTER MOBILE */}

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
