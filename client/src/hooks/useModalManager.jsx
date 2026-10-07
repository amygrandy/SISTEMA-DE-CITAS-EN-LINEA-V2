import { useState, useCallback } from 'react';

// Define tipos de modales (opcional pero PRO)
export const MODALS = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  CONFIRM: 'CONFIRM',
  STATUS: 'STATUS',
  CONFIGURATION: 'CONFIGURATION',
  MEDICINA_FAMILAIR: 'MEDICINA_FAMILAIR',
  ODONTOLOGIA: 'ODONTOLOGIA',
  ESPECIALIDADES: 'ESPECIALIDADES',
  CITAS_MEDICAS: 'CITAS_MEDICAS',
  POGRAMACIONES_CITAS: 'POGRAMACIONES_CITAS',
  HISOTRIAL_CITAS: 'HISOTRIAL_CITAS',
};

export function useModalManager() {
  const [modalState, setModalState] = useState({
    type: null,
    data: null,
  });

  const openModal = useCallback((type, data = null) => {
    setModalState({ type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, data: null });
  }, []);

  const isModalOpen = useCallback(
    (type) => modalState.type === type,
    [modalState.type],
  );

  return {
    modalState,
    openModal,
    closeModal,
    isModalOpen,
  };
}
