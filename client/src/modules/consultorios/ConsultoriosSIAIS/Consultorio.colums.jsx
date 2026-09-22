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
    accessorKey: 'empresa',
    header: 'ESTABLECIMIENTO',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">{row.original.empresa}</p>
      </div>
    ),
  },
  {
    accessorKey: 'idCuaderno',
    header: 'IDCUADERNO(idCuaderno)',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">
          {row.original.idCuaderno}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'consultorio',
    header: 'CONSULTORIO',
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">
          {row.original.consultorio}
        </p>
      </div>
    ),
  },
];
