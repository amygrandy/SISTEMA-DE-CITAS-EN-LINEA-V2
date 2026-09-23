import { BellAlertIcon } from '@heroicons/react/24/outline';

export default function ReminderCard() {
  return (
    <section className="relative min-h-52 overflow-hidden rounded-2xl bg-[#f7f8fb] p-5 shadow-sm">
      <h3 className="text-lg font-bold text-[#4d8187]">Recordatorio</h3>

      <div className="mt-3 pr-36">
        <ul className="list-disc space-y-2 pl-5 text-sm font-medium text-slate-900">
          <li>Llega 30 - 60 min antes.</li>

          <li>Hora referencial.</li>

          <li>Inasistencias suspenden el servicio en línea.</li>
        </ul>
      </div>

      {/* ICONO DECORATIVO */}
      <div className="absolute right-7 top-9 flex h-36 w-36 items-center justify-center rounded-full border-[5px] border-[#eadfc6]">
        <BellAlertIcon className="h-20 w-20 text-[#eadfc6]" />
      </div>
    </section>
  );
}
