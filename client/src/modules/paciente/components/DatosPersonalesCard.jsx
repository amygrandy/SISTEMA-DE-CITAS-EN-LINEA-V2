import {
  IdentificationIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

import InfoItem from './InfoItem';

export default function DatosPersonalesCard({ data }) {
  // const perfil = {
  //   nombreCompleto: 'ELVIS LUIS CHAVEZ TORREZ',
  //   foto: '/images/perfil.jpg',
  //   ci: '4454925 CB',
  //   direccion: 'COCHABAMBA / Colcapirhua / Sumumpaya AGUA DE CASTILLA SN',
  //   regional: 'COCHABAMBA',
  //   fechaNacimiento: '06/08/1980',
  //   fechaAfiliacion: '08/09/2026',
  //   //
  //   estadoAfiliacion: 'ACTIVO',
  //   tipoSeguro: 'PATRONAL (Seguro Obligatorio)',
  //   numeroReferencia: 'Sin registro',
  // };

  // const empresa = {
  //   razonSocial: 'CAJA NACIONAL DE SALUD',
  //   numeroPatronal: '02-730-00031',
  //   estado: 'AL DÍA',
  //   ultimoMesAporte: '',
  // };

  // const centroMedico = {
  //   centroMedico: 'CIMFA POLICLINICO QUILLACOLLO',
  //   consultorio: 'FISIATRIA',
  // };
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* FOTO */}
        <div className="flex flex-col items-center justify-center">
          <div className="overflow-hidden rounded-[28px] border border-slate-300 flex items-center justify-center h-44 w-44">
            {data?.foto ? (
              <img
                src={data.foto}
                alt="Fotografía del asegurado"
                className="h-44 w-44 object-cover"
              />
            ) : (
              <UserIcon className="h-24 w-24 text-slate-400" />
            )}
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
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-4">
            <InfoItem
              icon={CalendarDaysIcon}
              label="Fecha Nacimiento"
              value={data?.fechaNacimiento}
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
