import {
  BuildingOffice2Icon,
  HashtagIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

import InfoItem from './InfoItem';

export default function EmpresaCard({ data }) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* HEADER */}
      <div
        className="
          flex items-center justify-between gap-3
          border-b border-slate-200
          px-4 py-4
          sm:px-6
        "
      >
        <h3 className="min-w-0 text-lg font-bold text-slate-700 sm:text-xl">
          Empresa
        </h3>

        <button
          type="button"
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-lg text-slate-500
            transition hover:bg-slate-100
          "
        >
          <ChevronUpIcon className="h-5 w-5" />
        </button>
      </div>

      {/* BODY */}
      <div className="space-y-4 p-4 sm:p-6">
        {/* RAZÓN SOCIAL */}
        <div className="min-w-0">
          <InfoItem
            icon={BuildingOffice2Icon}
            label="Razón Social"
            value={data?.razonSocial}
          />
        </div>

        {/* NÚMERO PATRONAL / ESTADO */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="min-w-0">
            <InfoItem
              icon={HashtagIcon}
              label="Número Patronal"
              value={data?.numeroPatronal}
            />
          </div>

          <div className="min-w-0">
            <InfoItem
              icon={CheckCircleIcon}
              label="Estado"
              value={data?.estado}
            />
          </div>
        </div>

        {/* ÚLTIMO APORTE */}
        <div className="min-w-0">
          <InfoItem
            icon={CalendarDaysIcon}
            label="Último mes aporte"
            value={data?.ultimoMesAporte}
          />
        </div>
      </div>
    </section>
  );
}
