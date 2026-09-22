import { useState } from 'react';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  HeartIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const especialidades = [
  {
    id: 1,
    nombre: 'Medicina General',
    descripcion: 'Consulta médica general',
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
    descripcion: 'Salud y cuidado dental',
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

export default function SacarFichaMedica() {
  const [busqueda, setBusqueda] = useState('');
  const [especialidad, setEspecialidad] = useState(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  const especialidadesFiltradas = especialidades.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const confirmarFicha = () => {
    if (!especialidad || !fecha || !hora) {
      alert('Seleccione especialidad, fecha y horario.');
      return;
    }

    setConfirmado(true);
  };

  if (confirmado) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircleIcon className="h-12 w-12 text-emerald-600" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              ¡Ficha reservada!
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Su consulta médica fue registrada correctamente.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Detalle de la consulta
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <ClipboardDocumentListIcon className="h-5 w-5 text-blue-600" />

                <div>
                  <p className="text-xs text-slate-500">Especialidad</p>
                  <p className="font-semibold text-slate-800">
                    {especialidad.nombre}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDaysIcon className="h-5 w-5 text-blue-600" />

                <div>
                  <p className="text-xs text-slate-500">Fecha</p>
                  <p className="font-semibold text-slate-800">{fecha}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <ClockIcon className="h-5 w-5 text-blue-600" />

                <div>
                  <p className="text-xs text-slate-500">Hora</p>
                  <p className="font-semibold text-slate-800">{hora}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPinIcon className="h-5 w-5 text-blue-600" />

                <div>
                  <p className="text-xs text-slate-500">Establecimiento</p>
                  <p className="font-semibold text-slate-800">CIS AIQUILE</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setConfirmado(false);
              setEspecialidad(null);
              setFecha('');
              setHora('');
            }}
            className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Sacar otra ficha
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <HeartIcon className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="font-bold text-slate-900">SaludApp</h1>
              <p className="text-xs text-slate-500">
                Reserva de fichas médicas
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">Juan Pérez</p>
              <p className="text-xs text-slate-500">Paciente</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <UserIcon className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Nueva consulta</p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Sacar ficha médica
          </h2>

          <p className="mt-2 max-w-2xl text-slate-500">
            Seleccione la especialidad, fecha y horario en el que desea ser
            atendido.
          </p>
        </div>

        {/* Progreso */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-150 items-center">
            <Paso numero="1" texto="Especialidad" activo />

            <div className="h-px flex-1 bg-blue-200" />

            <Paso numero="2" texto="Fecha" activo={!!especialidad} />

            <div className="h-px flex-1 bg-blue-200" />

            <Paso numero="3" texto="Horario" activo={!!fecha} />

            <div className="h-px flex-1 bg-blue-200" />

            <Paso numero="4" texto="Confirmar" activo={!!hora} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Panel principal */}
          <section className="space-y-6">
            {/* Especialidad */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  1. ¿Qué atención necesita?
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Seleccione una especialidad médica.
                </p>
              </div>

              <div className="relative mb-5">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar especialidad..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {especialidadesFiltradas.map((item) => {
                  const seleccionado = especialidad?.id === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setEspecialidad(item);
                        setFecha('');
                        setHora('');
                      }}
                      className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                        seleccionado
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          seleccionado
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        <ClipboardDocumentListIcon className="h-6 w-6" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-800">
                          {item.nombre}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {item.descripcion}
                        </p>
                      </div>

                      <ChevronRightIcon className="h-5 w-5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fecha */}
            <div
              className={`rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 ${
                !especialidad ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  2. Seleccione una fecha
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Elija el día en que desea recibir atención.
                </p>
              </div>

              <div className="max-w-sm">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Fecha de atención
                </label>

                <div className="relative">
                  <CalendarDaysIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => {
                      setFecha(e.target.value);
                      setHora('');
                    }}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div
              className={`rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 ${
                !fecha ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  3. Seleccione un horario
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Los horarios mostrados están disponibles.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {horarios.map((item) => (
                  <button
                    key={item}
                    onClick={() => setHora(item)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      hora === item
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Resumen */}
          <aside>
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Resumen de su ficha
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Revise los datos antes de confirmar.
              </p>

              <div className="my-6 h-px bg-slate-100" />

              <div className="space-y-5">
                <ResumenItem
                  icono={<MapPinIcon className="h-5 w-5" />}
                  label="Establecimiento"
                  valor="CIS AIQUILE"
                />

                <ResumenItem
                  icono={<ClipboardDocumentListIcon className="h-5 w-5" />}
                  label="Especialidad"
                  valor={especialidad?.nombre || 'Sin seleccionar'}
                />

                <ResumenItem
                  icono={<CalendarDaysIcon className="h-5 w-5" />}
                  label="Fecha"
                  valor={fecha || 'Sin seleccionar'}
                />

                <ResumenItem
                  icono={<ClockIcon className="h-5 w-5" />}
                  label="Horario"
                  valor={hora || 'Sin seleccionar'}
                />
              </div>

              <div className="my-6 h-px bg-slate-100" />

              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <UserIcon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Paciente</p>
                    <p className="font-semibold text-slate-800">Juan Pérez</p>
                    <p className="mt-0.5 text-xs text-slate-500">CI: 1234567</p>
                  </div>
                </div>
              </div>

              <button
                onClick={confirmarFicha}
                disabled={!especialidad || !fecha || !hora}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <CheckCircleIcon className="h-5 w-5" />
                Confirmar ficha
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Podrá cancelar su ficha posteriormente si fuera necesario.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Paso({ numero, texto, activo }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
          activo ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
        }`}
      >
        {numero}
      </div>

      <span
        className={`text-sm font-medium ${
          activo ? 'text-slate-800' : 'text-slate-400'
        }`}
      >
        {texto}
      </span>
    </div>
  );
}

function ResumenItem({ icono, label, valor }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-blue-600">{icono}</div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-slate-800">{valor}</p>
      </div>
    </div>
  );
}
