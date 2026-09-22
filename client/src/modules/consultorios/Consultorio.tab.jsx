import { useState } from 'react';
import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import Tabs from '../../components/Tabs';
//
import ConsultoriosRegistrados from './ConsultoriosRegistrados/page/ConsultoriosRegistrados';
import ConsultorioPage from './ConsultoriosSIAIS/pages/ConsultorioPage';
import TipoConsultorioPage from './TiposConsultorio/pages/TipoConsultorioPage';

const tabs = [
  {
    label: 'CONSULTORIOS REGISTRADOS',
    value: 'ConsultoriosRegistrados',
    icon: BuildingOffice2Icon,
  },
  {
    label: 'TIPO DE CONSULTORIO',
    value: 'TipoConsultorioPage',
    icon: XCircleIcon,
  },
  {
    label: 'ZONIFICAR CONSULTORIOS',
    value: 'TipoConsultorioPage12',
    icon: XCircleIcon,
  },
  {
    label: 'MEDICOS POR CONSULTORIO SIAIS',
    value: 'activos',
    icon: CheckCircleIcon,
  },
  {
    label: 'CONSULTORIOS SIAIS',
    value: 'ConsultorioPage',
    icon: XCircleIcon,
  },
];

export default function ConsultoriosTab() {
  const [activeTab, setActiveTab] = useState('ConsultoriosRegistrados');

  return (
    <div className="p-1">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'ConsultoriosRegistrados' && <ConsultoriosRegistrados />}

        {activeTab === 'ConsultorioPage' && <ConsultorioPage />}

        {activeTab === 'TipoConsultorioPage' && <TipoConsultorioPage />}
      </div>
    </div>
  );
}
