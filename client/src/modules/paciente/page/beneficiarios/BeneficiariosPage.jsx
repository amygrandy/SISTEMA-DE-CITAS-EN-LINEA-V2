import { useMemo, useState } from 'react';
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  IdentificationIcon,
  HeartIcon,
  CreditCardIcon,
  PencilSquareIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

export default function BeneficiariosPage() {
  const [search, setSearch] = useState('');

  const beneficiarios = [
    {
      id: 1,
      matricula: '1025487',
      ci: '8456123 CB',
      nombres: 'María Fernanda',
      primer_apellido: 'Chávez',
      segundo_apellido: 'Rojas',
      parentesco: 'Hija',
      afiliacion: 'Activa',
      fechaNacimiento: '12/03/2012',
    },
    {
      id: 2,
      matricula: '1025488',
      ci: '6987451 CB',
      nombres: 'Ana Lucía',
      primer_apellido: 'Torrez',
      segundo_apellido: 'Vargas',
      parentesco: 'Esposa',
      afiliacion: 'Activa',
      fechaNacimiento: '28/11/1990',
    },
    {
      id: 3,
      matricula: '1025489',
      ci: '7412589 CB',
      nombres: 'Luis Alberto',
      primer_apellido: 'Chávez',
      segundo_apellido: 'Rojas',
      parentesco: 'Hijo',
      afiliacion: 'Pendiente',
      fechaNacimiento: '04/07/2018',
    },
    {
      id: 4,
      matricula: '1025490',
      ci: '9632587 CB',
      nombres: 'Julia Elena',
      primer_apellido: 'Torrez',
      segundo_apellido: 'Mendoza',
      parentesco: 'Madre',
      afiliacion: 'Inactiva',
      fechaNacimiento: '09/02/1963',
    },
  ];

  const beneficiariosFiltrados = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) return beneficiarios;

    return beneficiarios.filter((item) => {
      const nombreCompleto =
        `${item.nombres} ${item.primer_apellido} ${item.segundo_apellido}`.toLowerCase();

      return (
        nombreCompleto.includes(term) ||
        item.matricula.toLowerCase().includes(term) ||
        item.ci.toLowerCase().includes(term) ||
        item.parentesco.toLowerCase().includes(term)
      );
    });
  }, [beneficiarios, search]);

  const resumen = useMemo(() => {
    return {
      total: beneficiarios.length,
      activos: beneficiarios.filter((b) => b.afiliacion === 'Activa').length,
      pendientes: beneficiarios.filter((b) => b.afiliacion === 'Pendiente')
        .length,
      inactivos: beneficiarios.filter((b) => b.afiliacion === 'Inactiva')
        .length,
    };
  }, [beneficiarios]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-3xl border border-[#d8e4e1] bg-linear-to-r from-white via-white to-[#edf5f3] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#4f7c73]">
              Asegurado
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-800">
              Beneficiarios
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Consulta a tus beneficiarios registrados, revisa su estado de
              afiliación y accede rápidamente a su información principal.
            </p>
          </div>
        </div>
      </section>

      {/* BUSCADOR
      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, matrícula, CI o parentesco..."
              className="
                w-full rounded-2xl border border-slate-200
                bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700
                outline-none transition
                placeholder:text-slate-400
                focus:border-[#7aa79d] focus:bg-white
              "
            />
          </div>

          <p className="text-sm text-slate-500">
            Mostrando{' '}
            <span className="font-semibold text-slate-700">
              {beneficiariosFiltrados.length}
            </span>{' '}
            beneficiarios
          </p>
        </div>
      </section> */}

      {/* LISTA */}
      <section className="grid gap-5 lg:grid-cols-2">
        {beneficiariosFiltrados.map((item) => (
          <BeneficiarioCard key={item.id} item={item} />
        ))}
      </section>

      {beneficiariosFiltrados.length === 0 && (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <UserGroupIcon className="h-8 w-8 text-slate-400" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-700">
            No se encontraron beneficiarios
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Prueba con otro criterio de búsqueda.
          </p>
        </section>
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, tone = 'emerald' }) {
  const tones = {
    emerald: {
      box: 'bg-emerald-50',
      icon: 'text-emerald-600',
      ring: 'border-emerald-100',
    },
    green: {
      box: 'bg-green-50',
      icon: 'text-green-600',
      ring: 'border-green-100',
    },
    amber: {
      box: 'bg-amber-50',
      icon: 'text-amber-600',
      ring: 'border-amber-100',
    },
    rose: {
      box: 'bg-rose-50',
      icon: 'text-rose-600',
      ring: 'border-rose-100',
    },
  };

  const style = tones[tone];

  return (
    <article
      className={`rounded-3xl border ${style.ring} bg-white p-5 shadow-sm`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.box}`}
        >
          <Icon className={`h-6 w-6 ${style.icon}`} />
        </div>
      </div>
    </article>
  );
}

function BeneficiarioCard({ item }) {
  const nombreCompleto = `${item.nombres} ${item.primer_apellido} ${item.segundo_apellido}`;
  const initials = `${item.nombres?.[0] ?? ''}${item.primer_apellido?.[0] ?? ''}`;

  const statusStyles = {
    Activa: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    Pendiente: 'bg-amber-50 text-amber-700 border border-amber-100',
    Inactiva: 'bg-rose-50 text-rose-700 border border-rose-100',
  };

  const parentescoStyles = {
    Hija: 'bg-sky-50 text-sky-700',
    Hijo: 'bg-indigo-50 text-indigo-700',
    Esposa: 'bg-fuchsia-50 text-fuchsia-700',
    Esposo: 'bg-fuchsia-50 text-fuchsia-700',
    Madre: 'bg-orange-50 text-orange-700',
    Padre: 'bg-orange-50 text-orange-700',
  };

  return (
    <article
      className="
        group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm
        transition duration-200 hover:-translate-y-0.5 hover:border-[#aec7c1] hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="
              flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl
              bg-linear-to-br from-[#245249] to-[#4f7c73]
              text-lg font-bold text-white shadow-sm
            "
          >
            {initials.toUpperCase()}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-800">
                {nombreCompleto}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  parentescoStyles[item.parentesco] ??
                  'bg-slate-100 text-slate-700'
                }`}
              >
                {item.parentesco}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Beneficiario registrado del asegurado principal
            </p>
          </div>
        </div>

        {/* <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[item.afiliacion]
          }`}
        >
          {item.afiliacion}
        </span> */}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <InfoChip
          icon={CreditCardIcon}
          label="Matrícula"
          value={item.matricula}
          color="emerald"
        />

        <InfoChip
          icon={IdentificationIcon}
          label="Documento"
          value={item.ci}
          color="sky"
        />

        <InfoChip
          icon={HeartIcon}
          label="Parentesco"
          value={item.parentesco}
          color="pink"
        />

        <InfoChip
          icon={ClockIcon}
          label="Nacimiento"
          value={item.fechaNacimiento}
          color="amber"
        />
      </div>

      {/* <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="
            inline-flex items-center gap-2 rounded-xl
            bg-[#245249] px-4 py-2.5 text-sm font-semibold text-white
            transition hover:bg-[#1f443e]
          "
        >
          <EyeIcon className="h-4 w-4" />
          Ver detalle
        </button>

        <button
          type="button"
          className="
            inline-flex items-center gap-2 rounded-xl
            border border-slate-200 bg-white px-4 py-2.5
            text-sm font-semibold text-slate-700
            transition hover:bg-slate-50
          "
        >
          <PencilSquareIcon className="h-4 w-4" />
          Editar
        </button>
      </div> */}
    </article>
  );
}

function InfoChip({ icon: Icon, label, value, color = 'emerald' }) {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-600',
    sky: 'bg-sky-50 text-sky-600',
    pink: 'bg-pink-50 text-pink-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
