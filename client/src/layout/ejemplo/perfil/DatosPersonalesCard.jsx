import {
  IdentificationIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ShieldCheckIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

import InfoItem from './InfoItem';

export default function DatosPersonalesCard({ data }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* FOTO */}
        <div className="flex flex-col items-center justify-center">
          <div className="overflow-hidden rounded-[28px] border border-slate-300">
            <img
              src={data?.foto || '/images/perfil.jpg'}
              alt="Fotografía del asegurado"
              className="h-44 w-44 object-cover"
            />
          </div>

          <p className="mt-1 text-lg font-semibold text-slate-500">
            ID - TITULAR
          </p>

          <p className="text-lg font-bold text-green-700">VIGENTE</p>
        </div>

        {/* INFORMACIÓN */}
        <div className="grid gap-x-12 gap-y-4 md:grid-cols-2">
          {/* COLUMNA IZQUIERDA */}
          <div className="space-y-4">
            <InfoItem
              icon={IdentificationIcon}
              label="Cédula de Identidad"
              value={data?.ci}
            />

            <InfoItem
              icon={MapPinIcon}
              label="Dirección"
              value={data?.direccion}
            />

            <InfoItem
              icon={PaperAirplaneIcon}
              label="Regional"
              value={data?.regional}
            />

            <InfoItem
              icon={CheckCircleIcon}
              label="Estado Afiliación"
              value={data?.estadoAfiliacion}
            />
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-4">
            <InfoItem
              icon={CalendarDaysIcon}
              label="Fecha Nacimiento"
              value={data?.fechaNacimiento}
            />

            <InfoItem
              icon={ShieldCheckIcon}
              label="Tipo Seguro"
              value={data?.tipoSeguro}
            />

            <InfoItem
              icon={PhoneIcon}
              label="Número de referencia"
              value={data?.numeroReferencia}
            />

            <InfoItem
              icon={CalendarDaysIcon}
              label="Fecha Afiliación"
              value={data?.fechaAfiliacion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
