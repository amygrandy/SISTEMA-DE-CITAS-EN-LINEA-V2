export const getColumns = () => [
  {
    id: 'numero',
    header: 'N',
    cell: ({ row }) => (
      <span className="font-semibold text-[#005B57]">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: 'hora',
    header: 'HORA',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">{row.original.hora}</p>
      </div>
    ),
  },
  {
    accessorKey: 'fecha',
    header: 'FECHA',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">{row.original.fecha}</p>
      </div>
    ),
  },
  {
    accessorKey: 'paciente',
    header: 'PACIENTE',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">{row.original.paciente}</p>
      </div>
    ),
  },
  {
    accessorKey: 'nombre_medico',
    header: 'MEDICO',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">
          {row.original.nombre_medico}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'cit_observaciones',
    header: 'Origen Ficha',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">
          {row.original.cit_observaciones}
        </p>
      </div>
    ),
  },
  // {
  //   accessorKey: 'estado_descripcion',
  //   header: 'Estado',
  //   cell: ({ row }) => (
  //     <div>
  //       <p className="font-semibold text-slate-800">
  //         {row.original.estado_descripcion}
  //       </p>
  //     </div>
  //   ),
  // },
];
