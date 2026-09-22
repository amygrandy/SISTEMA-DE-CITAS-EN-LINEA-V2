import { useEffect, useState } from 'react';
import { EstablecimientoServices as services } from '../Establecimiento.services.js';
import DataTable from '../../../components/DataTable.jsx';
import { columns } from '../establecimiento.colums';

export default function FichasPage() {
  const [filas, setFilas] = useState([]);
  useEffect(() => {
    const dataLoad = async () => {
      try {
        const response = await services.getAll();

        setFilas(Array.isArray(response.data) ? response.data : []);
      } catch (e) {}
    };
    dataLoad();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={filas} />
    </div>
  );
}
