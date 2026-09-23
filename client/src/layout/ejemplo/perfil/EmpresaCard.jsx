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
    <section className="rounded-2xl border border-slate-200 bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h3 className="text-xl font-bold text-slate-700">Empresa</h3>

        <ChevronUpIcon className="h-5 w-5 text-slate-500" />
      </div>

      {/* BODY */}
      <div className="space-y-4 p-6">
        <InfoItem
          icon={BuildingOffice2Icon}
          label="Razón Social"
          value={data?.razonSocial}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InfoItem
            icon={HashtagIcon}
            label="Número Patronal"
            value={data?.numeroPatronal}
          />

          <InfoItem
            icon={CheckCircleIcon}
            label="Estado"
            value={data?.estado}
          />
        </div>

        <InfoItem
          icon={CalendarDaysIcon}
          label="Último mes aporte"
          value={data?.ultimoMesAporte}
        />
      </div>
    </section>
  );
}
