import { CheckCircleIcon } from '@heroicons/react/24/outline';

const estados = [
  'Afiliación Vigente',
  'Consultorio Asignado',
  'Empresa al Día',
  'Última Planilla',
];

export default function ProfileStatus() {
  return (
    <section className="min-h-full bg-[#f4f6f9] p-5">
      {/* ENCABEZADO */}
      <div className="flex items-start gap-4">
        {/* Simulación personaje médico */}
        <div className="flex h-28 w-16 shrink-0 items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dbe7e5] text-2xl font-bold text-[#587d79]">
            CNS
          </div>
        </div>

        <div className="pt-5">
          <h2 className="text-2xl font-bold text-[#244354]">CNS</h2>

          <p className="mt-1 text-lg font-bold text-slate-800">
            ¡Bienvenido/a, ELVIS LUIS CHAVEZ TORREZ!
          </p>
        </div>
      </div>

      {/* ESTADO */}
      <div className="mt-6">
        <h3 className="mb-4 text-base font-bold text-[#263e50]">
          Estado de su Perfil
        </h3>

        <div className="space-y-3">
          {estados.map((estado) => (
            <div
              key={estado}
              className="
                flex items-center gap-3
                rounded-xl bg-white
                px-4 py-3.5
                shadow-[0_3px_12px_rgba(15,23,42,0.07)]
              "
            >
              <CheckCircleIcon className="h-6 w-6 shrink-0 text-lime-500" />

              <p className="text-sm font-medium text-[#34495e]">{estado}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
