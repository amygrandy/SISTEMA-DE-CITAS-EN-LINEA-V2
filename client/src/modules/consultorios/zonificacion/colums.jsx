import {
  PencilSquareIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';
export const getColumns = ({ onEditar, onChangeStatus }) => [
  {
    id: 'numero',
    header: 'N',
    cell: ({ row }) => (
      <span className="font-semibold text-[#005B57]">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: 'nombre_consultorio',
    header: 'CONSULTORIO ASIGNADO',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">
          {row.original.nombre_consultorio}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'consultorios',
    header: 'CONSULTORIOS',
    cell: ({ row }) => {
      const consultorios = row.original.consultorios ?? [];

      if (consultorios.length === 0) {
        return <span className="text-sm text-slate-400">Sin consultorios</span>;
      }

      return (
        <div className="flex flex-wrap gap-2">
          {consultorios.map((consultorio) => (
            <span
              key={consultorio.zonificacion_id}
              className={`
              inline-flex items-center gap-1.5
              rounded-lg px-2.5 py-1
              text-xs font-semibold
              ${
                consultorio.estado
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-slate-100 text-slate-500'
              }
            `}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  consultorio.estado ? 'bg-emerald-600' : 'bg-slate-400'
                }`}
              />

              {consultorio.nombre_consultorio}
            </span>
          ))}
        </div>
      );
    },
  },

  {
    id: 'acciones',
    header: 'Acciones',
    cell: ({ row }) => {
      const activo = row.original.estado;

      return (
        <div className="flex items-center gap-2">
          {/* EDITAR */}
          <button
            type="button"
            onClick={() => onEditar(row.original)}
            className="
            inline-flex items-center gap-2
            rounded-lg border border-slate-200
            bg-white px-3 py-2
            text-sm font-medium text-slate-700
            shadow-sm
            transition-all duration-200
            hover:border-slate-300 hover:bg-slate-50
            hover:text-slate-900
            focus:outline-none focus:ring-2
            focus:ring-slate-300
          "
          >
            <PencilSquareIcon className="h-4 w-4" />
            EDITAR
          </button>

          {/* <button
            type="button"
            onClick={() => onChangeStatus(row.original.idCuaderno)}
            className={`
            inline-flex items-center gap-2
            rounded-xl border
            px-3 py-2
            text-sm font-medium
            shadow-sm
            transition-all duration-200
            focus:outline-none focus:ring-2
            ${
              activo
                ? `
                  border-red-200
                  bg-red-50
                  text-red-700
                  hover:border-red-300
                  hover:bg-red-100
                  focus:ring-red-200
                `
                : `
                  border-emerald-200
                  bg-emerald-50
                  text-emerald-700
                  hover:border-emerald-300
                  hover:bg-emerald-100
                  focus:ring-emerald-200
                `
            }
          `}
          >
            {activo ? (
              <>
                <NoSymbolIcon className="h-4 w-4" />
                DESHABILITAR
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-4 w-4" />
                HABILITAR
              </>
            )}
          </button> */}
        </div>
      );
    },
  },
];
