import { useState } from 'react';
import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import Tabs from '../../components/Tabs';

import ControlInasistenciaPage from './page/ControlInasistenciaPage';
import CantidadBeneficiariosPage from './page/CantidadBeneficiariosPage';
import HorarioHabilitacionPage from './page/HorarioHabilitacionPage';

const tabs = [
  {
    label: 'CONTROL INASISTENCIAS',
    value: 'ControlInasistenciaPage',
    icon: BuildingOffice2Icon,
  },
  {
    label: 'CANTIDAD BENEFICIARIOS',
    value: 'CantidadBeneficiariosPage',
    icon: XCircleIcon,
  },
  {
    label: 'HORARIO DE HABILITAICON PARA SACAR FICHAS',
    value: 'HorarioHabilitacionPage',
    icon: XCircleIcon,
  },
];

export default function ConsultoriosTab() {
  const [activeTab, setActiveTab] = useState('ControlInasistenciaPage');

  return (
    <div className="p-1">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'ControlInasistenciaPage' && <ControlInasistenciaPage />}

        {activeTab === 'CantidadBeneficiariosPage' && (
          <CantidadBeneficiariosPage />
        )}

        {activeTab === 'HorarioHabilitacionPage' && <HorarioHabilitacionPage />}
      </div>
    </div>
  );
}
