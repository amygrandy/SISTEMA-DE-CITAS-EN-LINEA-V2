import {
  BuildingOfficeIcon,
  Squares2X2Icon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

import InfoItem from './InfoItem';

export default function CentroMedicoCard({ data }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h3 className="text-xl font-bold text-slate-700">Centro Médico</h3>

        <ChevronUpIcon className="h-5 w-5 text-slate-500" />
      </div>

      <div className="space-y-5 p-6">
        <InfoItem
          icon={BuildingOfficeIcon}
          label="Centro Médico"
          value={data?.centroMedico}
        />

        <InfoItem
          icon={Squares2X2Icon}
          label="Consultorio"
          value={data?.consultorio}
        />
      </div>
    </section>
  );
}
