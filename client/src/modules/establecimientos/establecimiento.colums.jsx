export const columns = [
  {
    accessorKey: 'idestablecimiento',
    header: 'ID SIAIS (idestablecimiento)',
    cell: ({ row }) => (
      <span className="font-semibold text-[#005B57]">
        {row.original.idestablecimiento}
      </span>
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
