import { useMemo, useState } from 'react';

import {
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowRightIcon,
  MapIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

export default function EstablecimientosPage() {
  const [search, setSearch] = useState('');
  const [regional, setRegional] = useState('COCHABAMBA');

  const establecimientos = [
    {
      id: 1,
      nombre: 'CIS Policlínico del Sur',
      direccion: 'Pasaje Tarapacá esq. Pasaje A.',
      nivel: 'PRIMER NIVEL',
      telefono: '4258452',
      regional: 'COCHABAMBA',
      tipo: 'Policlínico',
    },
    {
      id: 2,
      nombre: 'CIS Puesto Médico Kami',
      direccion: 'Centro Minero Kami',
      nivel: 'PRIMER NIVEL',
      telefono: '4372156',
      regional: 'COCHABAMBA',
      tipo: 'Puesto Médico',
    },
    {
      id: 3,
      nombre: 'Hospital Obrero N.º 2',
      direccion:
        'Av. Blanco Galindo Km. 5 1/2, Manuel Villarroel Arnez y José Reyes Morales',
      nivel: 'TERCER NIVEL',
      telefono: '4267854',
      regional: 'COCHABAMBA',
      tipo: 'Hospital',
    },
    {
      id: 4,
      nombre: 'CIMFA M.A.V. N.º 32',
      direccion: 'Av. Ayacucho e/ Gral. Acha y Santiváñez',
      nivel: 'PRIMER NIVEL',
      telefono: '4251268',
      regional: 'COCHABAMBA',
      tipo: 'CIMFA',
    },
    {
      id: 5,
      nombre: 'CIMFA Policlínico Quillacollo',
      direccion: 'C. Cleómedes Blanco esq. Av. Aroma',
      nivel: 'PRIMER NIVEL',
      telefono: '4365897',
      regional: 'COCHABAMBA',
      tipo: 'Policlínico',
    },
    {
      id: 6,
      nombre: 'CIMFA Policlínico Villa Galindo',
      direccion: 'C. La Merced e/ Av. Perú y San Alberto',
      nivel: 'PRIMER NIVEL',
      telefono: '4412589',
      regional: 'COCHABAMBA',
      tipo: 'Policlínico',
    },
  ];

  const filtrados = useMemo(() => {
    const texto = search.toLowerCase().trim();

    return establecimientos.filter((item) => {
      const coincideRegional = !regional || item.regional === regional;

      const coincideBusqueda =
        !texto ||
        item.nombre.toLowerCase().includes(texto) ||
        item.direccion.toLowerCase().includes(texto) ||
        item.tipo.toLowerCase().includes(texto);

      return coincideRegional && coincideBusqueda;
    });
  }, [search, regional]);

  return (
    <div className="space-y-6">
      {/* ENCABEZADO */}
      <section
        className="
          overflow-hidden rounded-3xl
          border border-[#d7e4e1]
          bg-linear-to-r from-white via-white to-[#edf5f3]
          p-6 shadow-sm
        "
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <div
              className="
                flex h-14 w-14 shrink-0 items-center justify-center
                rounded-2xl bg-[#245249] text-white
                shadow-sm
              "
            >
              <BuildingOffice2Icon className="h-7 w-7" />
            </div>

            <div>
              <p
                className="
                  text-sm font-semibold uppercase
                  tracking-wide text-[#4f7c73]
                "
              >
                Red de atención
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-800">
                Establecimientos de Salud
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Encuentra centros médicos disponibles, consulta su nivel de
                atención y revisa la información necesaria antes de acudir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS */}

      {/* RESULTADOS */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Centros disponibles
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Selecciona un establecimiento para consultar más información.
            </p>
          </div>

          <span
            className="
              rounded-full bg-[#edf4f2]
              px-3 py-1.5 text-xs
              font-semibold text-[#245249]
            "
          >
            {filtrados.length} resultados
          </span>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {filtrados.map((item) => (
            <EstablecimientoCard key={item.id} item={item} />
          ))}
        </div>

        {filtrados.length === 0 && <EmptyState />}
      </section>
    </div>
  );
}

function EstablecimientoCard({ item }) {
  const nivelStyle = {
    'PRIMER NIVEL': 'border-emerald-100 bg-emerald-50 text-emerald-700',

    'SEGUNDO NIVEL': 'border-sky-100 bg-sky-50 text-sky-700',

    'TERCER NIVEL': 'border-violet-100 bg-violet-50 text-violet-700',
  };

  const iconStyle = {
    Hospital: 'bg-violet-50 text-violet-600',
    Policlínico: 'bg-emerald-50 text-emerald-600',
    CIMFA: 'bg-sky-50 text-sky-600',
    'Puesto Médico': 'bg-amber-50 text-amber-600',
  };

  return (
    <article
      className="
        group overflow-hidden rounded-3xl
        border border-slate-200 bg-white
        shadow-sm transition duration-200
        hover:-translate-y-0.5
        hover:border-[#a9c5bf]
        hover:shadow-md
      "
    >
      <div className="p-5">
        {/* CABECERA CARD */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            <div
              className={`
                flex h-13 w-13 shrink-0 items-center
                justify-center rounded-2xl
                ${iconStyle[item.tipo] ?? 'bg-slate-100 text-slate-600'}
              `}
            >
              <BuildingOffice2Icon className="h-7 w-7" />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-wide text-slate-400
                "
              >
                {item.tipo}
              </p>

              <h3 className="mt-1 text-lg font-bold text-slate-800">
                {item.nombre}
              </h3>
            </div>
          </div>

          <span
            className={`
              shrink-0 rounded-full border
              px-3 py-1 text-xs font-semibold
              ${nivelStyle[item.nivel] ?? 'border-slate-200 bg-slate-50 text-slate-600'}
            `}
          >
            {item.nivel}
          </span>
        </div>

        {/* INFORMACIÓN */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoItem
            icon={MapPinIcon}
            title="Dirección"
            value={item.direccion}
            tone="rose"
          />

          <InfoItem
            icon={PhoneIcon}
            title="Teléfono"
            value={item.telefono}
            tone="sky"
          />
        </div>
      </div>

      {/* ACCIONES */}
      <div
        className="
          flex flex-wrap items-center justify-between gap-3
          border-t border-slate-100
          bg-slate-50/60 px-5 py-4
        "
      >
        <button
          type="button"
          className="
            inline-flex items-center gap-2
            text-sm font-semibold text-slate-500
            transition hover:text-[#245249]
          "
        >
          <MapIcon className="h-5 w-5" />
          Ver ubicación
        </button>

        <button
          type="button"
          className="
            inline-flex items-center gap-2
            rounded-xl bg-[#245249]
            px-4 py-2.5
            text-sm font-semibold text-white
            transition
            hover:bg-[#1c433c]
          "
        >
          Ver detalle
          <ArrowRightIcon
            className="
              h-4 w-4 transition-transform
              group-hover:translate-x-1
            "
          />
        </button>
      </div>
    </article>
  );
}

function InfoItem({ icon: Icon, title, value, tone = 'emerald' }) {
  const tones = {
    emerald: 'bg-emerald-50 text-emerald-600',
    sky: 'bg-sky-50 text-sky-600',
    rose: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div
      className="
        flex items-start gap-3 rounded-2xl
        bg-slate-50 p-3
      "
    >
      <div
        className={`
          flex h-10 w-10 shrink-0
          items-center justify-center rounded-xl
          ${tones[tone]}
        `}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-xs font-semibold uppercase
            tracking-wide text-slate-400
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1 text-sm font-semibold
            leading-5 text-slate-700
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="
        rounded-3xl border border-dashed
        border-slate-300 bg-white
        px-6 py-14 text-center
      "
    >
      <div
        className="
          mx-auto flex h-16 w-16 items-center
          justify-center rounded-2xl bg-slate-100
        "
      >
        <BuildingOffice2Icon className="h-8 w-8 text-slate-400" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-700">
        No encontramos establecimientos
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Cambia la regional o intenta buscar con otro término.
      </p>
    </div>
  );
}
