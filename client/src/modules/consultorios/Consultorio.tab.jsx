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
import ZonificacionPage from './zonificacion/pages/ZonificacionPage';

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
    label: 'RELACION DE  CONSULTORIOS',
    value: 'ZonificacionPage',
    icon: XCircleIcon,
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

        {activeTab === 'ZonificacionPage' && <ZonificacionPage />}
      </div>
    </div>
  );
}
