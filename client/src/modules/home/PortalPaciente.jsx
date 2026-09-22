import { useState } from 'react';
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  IdentificationIcon,
  MapPinIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

/* =========================================================
   COLORES INSTITUCIONALES CNS

   Verde principal: #005B57
   Verde oscuro:    #004744
   Verde suave:     #EAF5F3
   Beige:            #E9B89D
========================================================= */

const personas = [
  {
    id: 1,
    nombre: 'Juan Carlos Pérez',
    ci: '8658154',
    parentesco: 'Titular',
    tipo: 'ASEGURADO',
    fechaNacimiento: '15/08/1985',
    edad: 41,
    codigoSeguro: 'SEG-000154',
  },
  {
    id: 2,
    nombre: 'María López Pérez',
    ci: '7458214',
    parentesco: 'Esposa',
    tipo: 'BENEFICIARIO',
    fechaNacimiento: '20/04/1988',
    edad: 38,
    codigoSeguro: 'SEG-000155',
  },
  {
    id: 3,
    nombre: 'Mateo Pérez López',
    ci: '10245874',
    parentesco: 'Hijo',
    tipo: 'BENEFICIARIO',
    fechaNacimiento: '12/02/2015',
    edad: 11,
    codigoSeguro: 'SEG-000156',
  },
];

const historial = {
  1: [
    {
      id: 1,
      fecha: '25/08/2026',
      hora: '09:00',
      especialidad: 'Medicina General',
      medico: 'Dra. María Fernández',
      establecimiento: 'CIS AIQUILE',
      estado: 'Atendido',
    },
    {
      id: 2,
      fecha: '12/06/2026',
      hora: '10:30',
      especialidad: 'Odontología',
      medico: 'Dr. Carlos Rojas',
      establecimiento: 'CIS AIQUILE',
      estado: 'Atendido',
    },
  ],

  2: [
    {
      id: 3,
      fecha: '15/07/2026',
      hora: '14:00',
      especialidad: 'Ginecología',
      medico: 'Dra. Ana Vargas',
      establecimiento: 'CIS AIQUILE',
      estado: 'Atendido',
    },
  ],

  3: [
    {
      id: 4,
      fecha: '03/08/2026',
      hora: '08:30',
      especialidad: 'Pediatría',
      medico: 'Dr. José Martínez',
      establecimiento: 'CIS AIQUILE',
      estado: 'Atendido',
    },
  ],
};

const especialidades = [
  {
    id: 1,
    nombre: 'Medicina General',
    descripcion: 'Consulta médica y evaluación general',
  },
  {
    id: 2,
    nombre: 'Pediatría',
    descripcion: 'Atención para niños y adolescentes',
  },
  {
    id: 3,
    nombre: 'Ginecología',
    descripcion: 'Atención integral de la mujer',
  },
  {
    id: 4,
    nombre: 'Odontología',
    descripcion: 'Atención y salud dental',
  },
  {
    id: 5,
    nombre: 'Medicina Interna',
    descripcion: 'Diagnóstico y tratamiento especializado',
  },
  {
    id: 6,
    nombre: 'Cardiología',
    descripcion: 'Atención cardiovascular',
  },
];

const horarios = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '14:00',
  '14:30',
  '15:00',
];

export default function PortalPaciente() {
  const [vista, setVista] = useState('familia');

  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);

  const [especialidad, setEspecialidad] = useState(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const seleccionarPersona = (persona) => {
    setPersonaSeleccionada(persona);
    setVista('detalle');
  };

  const abrirHistorial = (persona) => {
    setPersonaSeleccionada(persona);
    setVista('historial');
  };

  const reservarFicha = (persona) => {
    setPersonaSeleccionada(persona);

    setEspecialidad(null);
    setFecha('');
    setHora('');

    setVista('reserva');
  };

  const confirmarReserva = () => {
    if (!especialidad || !fecha || !hora) {
      return;
    }

    setVista('confirmacion');
  };

  const volverInicio = () => {
    setVista('familia');
    setPersonaSeleccionada(null);
    setEspecialidad(null);
    setFecha('');
    setHora('');
  };

  return (
    <div className="min-h-screen bg-[#F7F9F9]">
      <Header />

      {vista === 'familia' && (
        <Familia
          personas={personas}
          seleccionarPersona={seleccionarPersona}
          abrirHistorial={abrirHistorial}
          reservarFicha={reservarFicha}
        />
      )}

      {vista === 'detalle' && personaSeleccionada && (
        <DetallePersona
          persona={personaSeleccionada}
          volver={() => setVista('familia')}
          historial={() => abrirHistorial(personaSeleccionada)}
          reservar={() => reservarFicha(personaSeleccionada)}
        />
      )}

      {vista === 'historial' && personaSeleccionada && (
        <Historial
          persona={personaSeleccionada}
          consultas={historial[personaSeleccionada.id] || []}
          volver={() => setVista('detalle')}
          reservar={() => reservarFicha(personaSeleccionada)}
        />
      )}

      {vista === 'reserva' && personaSeleccionada && (
        <Reserva
          persona={personaSeleccionada}
          especialidad={especialidad}
          setEspecialidad={setEspecialidad}
          fecha={fecha}
          setFecha={setFecha}
          hora={hora}
          setHora={setHora}
          volver={() => setVista('detalle')}
          confirmar={confirmarReserva}
        />
      )}

      {vista === 'confirmacion' && personaSeleccionada && especialidad && (
        <Confirmacion
          persona={personaSeleccionada}
          especialidad={especialidad}
          fecha={fecha}
          hora={hora}
          finalizar={volverInicio}
        />
      )}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
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
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Juan Carlos Pérez
            </p>

            <p className="text-xs text-slate-500">Asegurado titular</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5F3]">
            <UserIcon className="h-5 w-5 text-[#005B57]" />
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   PANTALLA PRINCIPAL
========================================================= */

function Familia({
  personas,
  seleccionarPersona,
  abrirHistorial,
  reservarFicha,
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#005B57]">Bienvenido</p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Mi grupo familiar
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Seleccione al asegurado o beneficiario para consultar su historial
          médico o reservar una nueva ficha.
        </p>
      </div>

      {/* Estadísticas */}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <ResumenCard
          titulo="Personas aseguradas"
          valor={personas.length}
          icon={<UserGroupIcon className="h-6 w-6" />}
        />

        <ResumenCard
          titulo="Asegurado titular"
          valor="1"
          icon={<IdentificationIcon className="h-6 w-6" />}
        />

        <ResumenCard
          titulo="Beneficiarios"
          valor={personas.length - 1}
          icon={<UserIcon className="h-6 w-6" />}
        />
      </div>

      {/* Personas */}

      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">
          Personas registradas
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Gestione la atención médica de cada integrante.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            seleccionar={() => seleccionarPersona(persona)}
            historial={() => abrirHistorial(persona)}
            reservar={() => reservarFicha(persona)}
          />
        ))}
      </div>
    </main>
  );
}

function ResumenCard({ titulo, valor, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-500">{titulo}</p>

          <p className="mt-1 text-2xl font-bold text-slate-900">{valor}</p>
        </div>
      </div>
    </div>
  );
}

function PersonaCard({ persona, seleccionar, historial, reservar }) {
  const esTitular = persona.tipo === 'ASEGURADO';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={seleccionar}
        className="w-full p-5 text-left"
      >
        <div className="flex items-start gap-4">
          <Avatar nombre={persona.nombre} />

          <div className="min-w-0 flex-1">
            <div className="mb-2">
              {esTitular ? (
                <span className="inline-flex rounded-full bg-[#EAF5F3] px-2.5 py-1 text-xs font-semibold text-[#005B57]">
                  Asegurado titular
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-[#F8EAE2] px-2.5 py-1 text-xs font-semibold text-[#9A5E3D]">
                  Beneficiario
                </span>
              )}
            </div>

            <h3 className="truncate text-lg font-bold text-slate-900">
              {persona.nombre}
            </h3>

            <p className="mt-1 text-sm text-slate-500">CI: {persona.ci}</p>

            <p className="mt-0.5 text-sm text-slate-500">
              {persona.parentesco}
            </p>
          </div>

          <ChevronRightIcon className="h-5 w-5 shrink-0 text-slate-400" />
        </div>
      </button>

      <div className="border-t border-slate-100 bg-slate-50 p-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={historial}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#005B57] hover:text-[#005B57]"
          >
            <ClipboardDocumentListIcon className="h-5 w-5" />
            Historial
          </button>

          <button
            type="button"
            onClick={reservar}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#005B57] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004744]"
          >
            <CalendarDaysIcon className="h-5 w-5" />
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function Avatar({ nombre }) {
  const iniciales = obtenerIniciales(nombre);

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF5F3] text-lg font-bold text-[#005B57]">
      {iniciales}
    </div>
  );
}

function AvatarGrande({ nombre }) {
  const iniciales = obtenerIniciales(nombre);

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5F3] text-2xl font-bold text-[#005B57]">
      {iniciales}
    </div>
  );
}

function obtenerIniciales(nombre) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase();
}

/* =========================================================
   DETALLE DEL ASEGURADO / BENEFICIARIO
========================================================= */

function DetallePersona({ persona, volver, historial, reservar }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <BotonVolver onClick={volver}>Volver a mi grupo familiar</BotonVolver>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-2 bg-[#005B57]" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <AvatarGrande nombre={persona.nombre} />

            <div className="flex-1">
              {persona.tipo === 'ASEGURADO' ? (
                <span className="inline-flex rounded-full bg-[#EAF5F3] px-3 py-1 text-xs font-semibold text-[#005B57]">
                  Asegurado titular
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-[#F8EAE2] px-3 py-1 text-xs font-semibold text-[#9A5E3D]">
                  Beneficiario · {persona.parentesco}
                </span>
              )}

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {persona.nombre}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Código de asegurado: {persona.codigoSeguro}
              </p>
            </div>

            <button
              type="button"
              onClick={reservar}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#005B57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004744]"
            >
              <CalendarDaysIcon className="h-5 w-5" />
              Reservar ficha
            </button>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8">
          <h3 className="font-bold text-slate-900">Datos del paciente</h3>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Dato label="Cédula de identidad" valor={persona.ci} />

            <Dato label="Fecha de nacimiento" valor={persona.fechaNacimiento} />

            <Dato label="Edad" valor={`${persona.edad} años`} />

            <Dato label="Parentesco" valor={persona.parentesco} />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
              <ClipboardDocumentListIcon className="h-6 w-6" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Historial de atenciones
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Consulte las fichas y atenciones anteriores de este paciente.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={historial}
            className="flex items-center gap-1 text-sm font-semibold text-[#005B57] hover:text-[#004744]"
          >
            Ver historial completo
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
}

function Dato({ label, valor }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">{valor}</p>
    </div>
  );
}

/* =========================================================
   HISTORIAL
========================================================= */

function Historial({ persona, consultas, volver, reservar }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <BotonVolver onClick={volver}>Volver al paciente</BotonVolver>

      <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#005B57]">
            {persona.nombre}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Historial médico
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Fichas y atenciones médicas registradas.
          </p>
        </div>

        <button
          type="button"
          onClick={reservar}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#005B57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004744]"
        >
          <CalendarDaysIcon className="h-5 w-5" />
          Nueva reserva
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {consultas.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-slate-300" />

            <h3 className="mt-4 font-bold text-slate-800">Sin historial</h3>

            <p className="mt-1 text-sm text-slate-500">
              Este paciente aún no tiene atenciones registradas.
            </p>
          </div>
        )}

        {consultas.map((consulta) => (
          <div
            key={consulta.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
                <ClipboardDocumentListIcon className="h-6 w-6" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-bold text-slate-900">
                    {consulta.especialidad}
                  </h3>

                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {consulta.estado}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">{consulta.medico}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:min-w-125">
                <InfoHistorial
                  icon={<CalendarDaysIcon className="h-5 w-5" />}
                  label="Fecha"
                  value={consulta.fecha}
                />

                <InfoHistorial
                  icon={<ClockIcon className="h-5 w-5" />}
                  label="Hora"
                  value={consulta.hora}
                />

                <InfoHistorial
                  icon={<MapPinIcon className="h-5 w-5" />}
                  label="Establecimiento"
                  value={consulta.establecimiento}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function InfoHistorial({ icon, label, value }) {
  return (
    <div className="flex gap-2">
      <div className="mt-0.5 text-[#005B57]">{icon}</div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>

        <p className="text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

/* =========================================================
   RESERVA DE FICHA
========================================================= */

function Reserva({
  persona,
  especialidad,
  setEspecialidad,
  fecha,
  setFecha,
  hora,
  setHora,
  volver,
  confirmar,
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BotonVolver onClick={volver}>Volver al paciente</BotonVolver>

      <div className="mt-6">
        <p className="text-sm font-semibold text-[#005B57]">
          Nueva ficha médica
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Reservar atención
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Complete los siguientes datos para reservar una ficha médica.
        </p>
      </div>

      {/* Paciente seleccionado */}

      <div className="mt-6 rounded-2xl border border-[#CFE5E2] bg-[#EAF5F3] p-4">
        <div className="flex items-center gap-4">
          <Avatar nombre={persona.nombre} />

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-[#005B57]">
              Paciente seleccionado
            </p>

            <p className="truncate font-bold text-slate-900">
              {persona.nombre}
            </p>

            <p className="text-sm text-slate-500">
              CI: {persona.ci} · {persona.parentesco}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Especialidad */}

          <SeccionReserva
            numero="1"
            titulo="Seleccione una especialidad"
            descripcion="Elija el servicio médico que necesita."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {especialidades.map((item) => {
                const seleccionado = especialidad?.id === item.id;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      setEspecialidad(item);
                      setFecha('');
                      setHora('');
                    }}
                    className={`rounded-xl border p-4 text-left transition ${
                      seleccionado
                        ? 'border-[#005B57] bg-[#EAF5F3] ring-2 ring-[#CFE5E2]'
                        : 'border-slate-200 bg-white hover:border-[#005B57]'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          seleccionado
                            ? 'bg-[#005B57] text-white'
                            : 'bg-[#EAF5F3] text-[#005B57]'
                        }`}
                      >
                        <ClipboardDocumentListIcon className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {item.nombre}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.descripcion}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </SeccionReserva>

          {/* Fecha */}

          <SeccionReserva
            numero="2"
            titulo="Seleccione una fecha"
            descripcion="Elija la fecha en la que desea recibir atención."
            disabled={!especialidad}
          >
            <div className="max-w-sm">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha de atención
              </label>

              <input
                type="date"
                value={fecha}
                onChange={(e) => {
                  setFecha(e.target.value);
                  setHora('');
                }}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#005B57] focus:ring-4 focus:ring-[#EAF5F3]"
              />
            </div>
          </SeccionReserva>

          {/* Horario */}

          <SeccionReserva
            numero="3"
            titulo="Seleccione un horario"
            descripcion="Estos son los horarios disponibles para la fecha seleccionada."
            disabled={!fecha}
          >
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {horarios.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setHora(item)}
                  className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                    hora === item
                      ? 'border-[#005B57] bg-[#005B57] text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-[#005B57] hover:bg-[#EAF5F3]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </SeccionReserva>
        </div>

        {/* Resumen */}

        <aside>
          <div className="sticky top-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#005B57] p-5">
              <h3 className="text-lg font-bold text-white">
                Resumen de la ficha
              </h3>

              <p className="mt-1 text-xs text-white/70">
                Revise la información antes de confirmar.
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <ResumenReserva label="Paciente" valor={persona.nombre} />

                <ResumenReserva label="Establecimiento" valor="CIS AIQUILE" />

                <ResumenReserva
                  label="Especialidad"
                  valor={especialidad?.nombre || 'Sin seleccionar'}
                />

                <ResumenReserva
                  label="Fecha"
                  valor={fecha || 'Sin seleccionar'}
                />

                <ResumenReserva
                  label="Horario"
                  valor={hora || 'Sin seleccionar'}
                />
              </div>

              <div className="my-6 h-px bg-slate-100" />

              <button
                type="button"
                disabled={!especialidad || !fecha || !hora}
                onClick={confirmar}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#005B57] py-3.5 text-sm font-semibold text-white transition hover:bg-[#004744] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <CheckCircleIcon className="h-5 w-5" />
                Confirmar ficha
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                Verifique que el paciente, la fecha y el horario sean correctos.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function SeccionReserva({
  numero,
  titulo,
  descripcion,
  children,
  disabled = false,
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${
        disabled ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005B57] text-sm font-bold text-white">
          {numero}
        </div>

        <div>
          <h3 className="font-bold text-slate-900">{titulo}</h3>

          {descripcion && (
            <p className="mt-1 text-sm text-slate-500">{descripcion}</p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}

function ResumenReserva({ label, valor }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">{valor}</p>
    </div>
  );
}

/* =========================================================
   CONFIRMACIÓN
========================================================= */

function Confirmacion({ persona, especialidad, fecha, hora, finalizar }) {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="h-2 bg-[#005B57]" />

        <div className="p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF5F3]">
              <CheckCircleIcon className="h-12 w-12 text-[#005B57]" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              ¡Ficha reservada!
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              La reserva médica fue registrada correctamente.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <div className="mb-5 flex items-center gap-3">
              <Avatar nombre={persona.nombre} />

              <div>
                <p className="text-xs font-semibold uppercase text-[#005B57]">
                  Paciente
                </p>

                <p className="font-bold text-slate-900">{persona.nombre}</p>

                <p className="text-xs text-slate-500">CI: {persona.ci}</p>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="mt-5 space-y-4">
              <DetalleConfirmacion
                icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
                label="Especialidad"
                value={especialidad.nombre}
              />

              <DetalleConfirmacion
                icon={<CalendarDaysIcon className="h-5 w-5" />}
                label="Fecha"
                value={fecha}
              />

              <DetalleConfirmacion
                icon={<ClockIcon className="h-5 w-5" />}
                label="Horario"
                value={hora}
              />

              <DetalleConfirmacion
                icon={<MapPinIcon className="h-5 w-5" />}
                label="Establecimiento"
                value="CIS AIQUILE"
              />
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-[#E4D1C6] bg-[#FBF2EC] p-4">
            <p className="text-sm leading-6 text-[#7D563F]">
              Preséntese con anticipación en el establecimiento y lleve su
              documentación correspondiente.
            </p>
          </div>

          <button
            type="button"
            onClick={finalizar}
            className="mt-6 w-full rounded-xl bg-[#005B57] py-3.5 text-sm font-semibold text-white transition hover:bg-[#004744]"
          >
            Volver a mi grupo familiar
          </button>
        </div>
      </div>
    </main>
  );
}

function DetalleConfirmacion({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#005B57]">{icon}</div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>

        <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

/* =========================================================
   BOTÓN VOLVER
========================================================= */

function BotonVolver({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#005B57]"
    >
      <ArrowLeftIcon className="h-5 w-5" />

      {children}
    </button>
  );
}
