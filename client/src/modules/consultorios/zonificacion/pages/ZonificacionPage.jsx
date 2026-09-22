import DataTable from '../../../../components/DataTable';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { MODALS, useModalManager } from '../../../../hooks/useModalManager';
import SearchInput from '../../../../components/SearchInput';
import ZonificacionModal from './ZonificacionModal';
import { ZonificacionServices as services } from '../zonificacion.services';
import { getColumns } from '../colums';

export default function ZonificacionConsultorios() {
  const [search, setSearch] = useState('');
  const [filas, setFilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { closeModal, isModalOpen, modalState, openModal } = useModalManager();

  const dataLoad = useCallback(async () => {
    try {
      const response = await services.getAll();
      setFilas(Array.isArray(response.data) ? response.data : []);
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(
          e.message || 'No se Pudo cargar los establecimientos',
        );
      } else {
        return toast.error('Intentelo mas tarde');
      }
    }
  }, []);

  useEffect(() => {
    dataLoad();
  }, [dataLoad]);

  const columns = useMemo(
    () =>
      getColumns({
        onEditar: () => {},
        onChangeStatus: () => {},
      }),
    [],
  );

  const filasFiltradas = useMemo(() => {
    const texto = search.trim().toLowerCase();

    if (!texto) {
      return filas;
    }

    return filas.filter((fila) => {
      const consultorio = String(fila.nombre_consultorio ?? '').toLowerCase();

      return consultorio.includes(texto);
    });
  }, [filas, search]);

  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <SearchInput value={search} onChange={setSearch} />

          <button
            className="bg-green-800 py-3 px-5 rounded-2xl text-white hover:bg-emerald-900 font-semibold"
            onClick={() => {
              openModal(MODALS.CREATE);
            }}
          >
            ZONIFICAR CONSULTORIOS
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={filasFiltradas} />

      <ZonificacionModal
        open={isModalOpen(MODALS.CREATE)}
        onClose={closeModal}
        onTable={dataLoad}
      />
    </>
  );
}
