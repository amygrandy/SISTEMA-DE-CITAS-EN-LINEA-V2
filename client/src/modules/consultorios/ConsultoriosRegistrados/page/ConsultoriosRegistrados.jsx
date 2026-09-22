import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchInput from '../../../../components/SearchInput';
import DataTable from '../../../../components/DataTable';
import ConfirmModal from '../../../../components/ConfirmModal';
import { MODALS, useModalManager } from '../../../../hooks/useModalManager';

import ConsultorioRegistradosModal from './ConsultorioRegistradosModal';
import ConsultorioCambioTipoModal from './ConsultorioCambioTipoModal';
import { ConsultorioServices as services } from '../services';
import { getColumns } from '../colums';
import { toast } from 'react-toastify';

export default function ConsultoriosRegistradosPage() {
  const [filas, setFilas] = useState([]);
  const [search, setSearch] = useState('');
  const { closeModal, isModalOpen, modalState, openModal } = useModalManager();
  const [loadin, setLoading] = useState(false);

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

  const handelChangeStatus = (id) => {
    openModal(MODALS.STATUS, id);
  };
  const handleChangeTipoConsultorio = (row) => {
    openModal(MODALS.EDIT, row);
  };
  const columns = useMemo(
    () =>
      getColumns({
        onEditar: handleChangeTipoConsultorio,
        onChangeStatus: handelChangeStatus,
      }),
    [],
  );

  const handleChangeStatus = async () => {
    try {
      setLoading(true);

      const response = await services.changeStatus({ id: modalState.data });
      if (!response.ok) {
        throw new Error(response.message || 'No se pudo cambiar de estado');
      }
      dataLoad();
      closeModal();
      toast.success(
        response.message || 'Se pudo cambiar el estado correctamente',
      );
    } catch (e) {
      if (e instanceof Error) {
        return toast.error(e.message || 'No se pudo cambiar de estado');
      } else {
        return toast.error('Algo salio mal, intentelo mas tarde');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <SearchInput value={search} onChange={setSearch} />
        <button
          onClick={() => {
            openModal(MODALS.CREATE);
          }}
          className="rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900"
        >
          REGISTRAR CONSULTORIO
        </button>
      </div>

      <DataTable columns={columns} data={filasFiltradas} />

      <ConsultorioRegistradosModal
        open={isModalOpen(MODALS.CREATE)}
        onClose={closeModal}
        onTable={dataLoad}
      />
      <ConfirmModal
        open={isModalOpen(MODALS.STATUS)}
        onClose={closeModal}
        loading={loadin}
        onConfirm={handleChangeStatus}
        type="estado"
      />
      <ConsultorioCambioTipoModal
        open={isModalOpen(MODALS.EDIT)}
        onClose={closeModal}
        onTable={dataLoad}
        id={modalState.data?.idCuaderno}
        tipo_consultorio={modalState.data?.tipo_consultorio}
      />
    </div>
  );
}
