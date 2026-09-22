export const columns = [
  {
    id: 'numero',
    header: 'N',
    cell: ({ row }) => (
      <span className="font-semibold text-[#005B57]">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: 'nombre_establecimiento',
    header: 'ESTABLECIMIENTO',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">
          {row.original.nombre_establecimiento}
        </p>
      </div>
    ),
  },
];
