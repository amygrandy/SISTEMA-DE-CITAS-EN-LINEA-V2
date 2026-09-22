import { useEffect, useMemo, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { ConsultorioServices as services } from '../consultorio.services.js';
import DataTable from '../../../../components/DataTable.jsx';
import { columns } from '../Consultorio.colums.jsx';

export default function ConsultoriosPage() {
  const [filas, setFilas] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const dataLoad = async () => {
      try {
        const response = await services.getAllSIAIS();

        setFilas(Array.isArray(response.data) ? response.data : []);
      } catch (e) {
        console.error(e);
      }
    };

    dataLoad();
  }, []);

  const filasFiltradas = useMemo(() => {
    const texto = search.trim().toLowerCase();

    if (!texto) {
      return filas;
    }

    return filas.filter((fila) => {
      const id = String(fila.idestablecimiento ?? '').toLowerCase();

      const establecimiento = String(fila.empresa ?? '').toLowerCase();

      return id.includes(texto) || establecimiento.includes(texto);
    });
  }, [filas, search]);

  return (
    <div>
      {/* BUSCADOR */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por ID o establecimiento..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-2.5
              pl-10
              pr-10
              text-sm
              text-slate-700
              shadow-sm
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#005B57]
              focus:ring-2
              focus:ring-[#005B57]/10
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-md
                p-1
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-600
              "
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <DataTable columns={columns} data={filasFiltradas} />
    </div>
  );
}
