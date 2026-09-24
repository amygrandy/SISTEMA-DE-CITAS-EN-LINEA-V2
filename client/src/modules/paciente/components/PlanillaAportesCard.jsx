import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function PlanillaAportesCard({ data = [] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h3 className="text-xl font-bold text-slate-700">
          Planilla de aportes
        </h3>

        <ChevronUpIcon className="h-5 w-5 text-slate-500" />
      </div>

      <div className="p-6">
        <p className="mb-4 text-sm font-bold text-slate-700">FUENTE: CNS</p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-125 text-sm">
            <thead>
              <tr className="border-b border-[#80a66e] text-slate-700">
                <th className="px-4 py-2 text-center font-semibold">
                  Razón Social
                </th>

                <th className="px-4 py-2 text-center font-semibold">Gestión</th>

                <th className="px-4 py-2 text-center font-semibold">Periodo</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id ?? index}
                  className="border-b border-slate-100"
                >
                  <td className="px-4 py-2 text-center text-slate-700">
                    {item.razonSocial}
                  </td>

                  <td className="px-4 py-2 text-center text-slate-700">
                    {item.gestion}
                  </td>

                  <td className="px-4 py-2 text-center text-slate-700">
                    {item.periodo}
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-slate-400"
                  >
                    No existen aportes registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
