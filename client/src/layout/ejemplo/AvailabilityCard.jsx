import {
  ExclamationCircleIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

export default function AvailabilityCard() {
  return (
    <section className="rounded-2xl bg-[#f7f8fb] p-5 shadow-sm">
      <h3 className="text-lg font-bold text-[#4d8187]">
        Disponibilidad para reservas de citas en línea
      </h3>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-5">
        {/* MENSAJE */}
        <div className="flex flex-col items-center justify-center text-center">
          <ExclamationCircleIcon className="h-9 w-9 text-[#5e8d91]" />

          <p className="mt-3 max-w-xs text-sm leading-5 text-[#538389]">
            Su centro médico no está habilitado para
            <br />
            citas médicas en línea
          </p>
        </div>

        {/* ICONO GRANDE */}
        <div className="flex h-36 w-36 items-center justify-center rounded-full border-[5px] border-[#588988]">
          <div className="relative">
            <CalendarDaysIcon className="h-20 w-20 text-[#588988]" />

            <PlusCircleIcon className="absolute -right-2 top-0 h-6 w-6 bg-[#f7f8fb] text-[#588988]" />
          </div>
        </div>
      </div>
    </section>
  );
}
