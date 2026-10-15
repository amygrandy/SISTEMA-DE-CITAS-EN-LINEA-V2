import { useEffect, useMemo, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
//COMPONENTES
import DataTable from '../../../../components/DataTable.jsx';
import SearchInput from '../../../../components/SearchInput.jsx';
import ConfirmModal from '../../../../components/ConfirmModal.jsx';
//
import { getColumns } from '../colums.jsx';
import { TipoConsultorioServices as services } from '../services.js';
import { MODALS, useModalManager } from '../../../../hooks/useModalManager.jsx';

import TipoConsultorioModal from './TipoConsultorioModal.jsx';

export default function TipoConsultorioPage() {
  const [filas, setFilas] = useState([]);
  const [search, setSearch] = useState('');
  const [loadingTable, setLoadingTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { closeModal, isModalOpen, modalState, openModal } = useModalManager();

  const dataLoad = useCallback(async () => {
    try {
      setLoadingTable(true);
      const response = await services.getAll();
      setFilas(Array.isArray(response.data) ? response.data : []);
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message);
      } else {
        return toast.error('Ocurrio un error inesperado intentelo mas tarde');
      }
    } finally {
      setLoadingTable(false);
    }
  }, []);

  useEffect(() => {
    dataLoad();
  }, [dataLoad]);

  const filasFiltradas = useMemo(() => {
    const texto = search.trim().toLowerCase();
    if (!texto) {
      return filas;
    }
    return filas.filter((fila) => {
      const nombre_tipo = String(fila.nombre_tipo ?? '').toLowerCase();
      return nombre_tipo.includes(texto);
    });
  }, [filas, search]);

  const handleEditar = (row) => {
    openModal(MODALS.EDIT, row);
  };
  const handelChangeStatus = (id) => {
    openModal(MODALS.STATUS, id);
  };
  const saveChangeStatus = async () => {
    try {
      setLoading(true);
      const response = await services.changeStatus({ id: modalState.data });
      if (!response.ok) {
        throw new Error(response.message || 'No se pudo cambiar el estado');
      }
      toast.success(
        response.message || 'Si se pudo cambiar el estado correctamente',
      );
      closeModal();
      dataLoad();
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message);
      } else {
        return toast.error('Ocurrio un error inesperado intentelo mas tarde');
      }
    } finally {
      setLoading(false);
    }
  };
  const columns = useMemo(
    () =>
      getColumns({
        onEditar: handleEditar,
        onChangeStatus: handelChangeStatus,
      }),
    [],
  );

  return (
    <>
      <div>
        {/* BUSCADOR */}
        <div className="mb-4 flex items-center justify-between">
          <SearchInput value={search} onChange={setSearch} />

          <button
            className="rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900"
            onClick={() => {
              openModal(MODALS.CREATE);
            }}
          >
            CREAR NUEVO REGISTRO
          </button>
        </div>

        <DataTable
          columns={columns}
          data={filasFiltradas}
          loading={loadingTable}
        />
      </div>
      <TipoConsultorioModal
        open={isModalOpen(MODALS.CREATE)}
        onClose={closeModal}
        onTable={dataLoad}
      />
      <TipoConsultorioModal
        isEdit={true}
        row={modalState.data}
        open={isModalOpen(MODALS.EDIT)}
        onClose={closeModal}
        onTable={dataLoad}
      />
      <ConfirmModal
        open={isModalOpen(MODALS.STATUS)}
        loading={loading}
        onClose={closeModal}
        onConfirm={saveChangeStatus}
        type="estado"
      />
    </>
  );
}
