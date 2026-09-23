import { useState } from 'react';

import Header from '../Header';
import Sidebar from '../Sidebar';

import DatosPersonalesCard from './DatosPersonalesCard';
import EmpresaCard from './EmpresaCard';
import CentroMedicoCard from './CentroMedicoCard';
import PlanillaAportesCard from './PlanillaAportesCard';

export default function PerfilPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ----------------------------------------------------
  // EJEMPLO
  // Después esto vendrá de tu API
  // ----------------------------------------------------

  const perfil = {
    nombreCompleto: 'ELVIS LUIS CHAVEZ TORREZ',

    foto: '/images/perfil.jpg',

    ci: '4454925 CB',

    direccion: 'COCHABAMBA / Colcapirhua / Sumumpaya AGUA DE CASTILLA SN',

    regional: 'COCHABAMBA',

    estadoAfiliacion: 'ACTIVO',

    fechaNacimiento: '06/08/1980',

    tipoSeguro: 'PATRONAL (Seguro Obligatorio)',

    numeroReferencia: 'Sin registro',

    fechaAfiliacion: '08/09/2026',
  };

  const empresa = {
    razonSocial: 'CAJA NACIONAL DE SALUD',

    numeroPatronal: '02-730-00031',

    estado: 'AL DÍA',

    ultimoMesAporte: '',
  };

  const centroMedico = {
    centroMedico: 'CIMFA POLICLINICO QUILLACOLLO',

    consultorio: 'FISIATRIA',
  };

  const planillas = [
    {
      id: 1,
      razonSocial: 'CAJA NACIONAL DE SALUD',
      gestion: '2026',
      periodo: 'AGOSTO',
    },
  ];

  return (
    <div className="min-h-screen bg-[#e9eeee]">
      {/* HEADER */}
      <Header onMenu={() => setSidebarOpen((prev) => !prev)} />

      {/* BODY */}
      <div
        className={`
          grid min-h-[calc(100vh-64px)] gap-6 p-6

          ${
            sidebarOpen
              ? 'lg:grid-cols-[285px_minmax(0,1fr)]'
              : 'lg:grid-cols-1'
          }
        `}
      >
        {/* SIDEBAR */}
        {sidebarOpen && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}

        {/* CONTENIDO */}
        <main className="min-w-0">
          <div className="min-h-full rounded-2xl bg-white p-7 shadow-sm">
            {/* TITULO */}
            <div className="mb-1">
              <h1 className="text-2xl font-bold text-slate-700">Mi Perfil</h1>

              <p className="text-xl font-semibold text-slate-500">
                {perfil.nombreCompleto}
              </p>
            </div>

            {/* DATOS PERSONALES */}
            <DatosPersonalesCard data={perfil} />

            {/* INFORMACIÓN INFERIOR */}
            <div className="mt-3 grid items-start gap-3 xl:grid-cols-2">
              {/* COLUMNA IZQUIERDA */}
              <div className="space-y-3">
                <EmpresaCard data={empresa} />

                <PlanillaAportesCard data={planillas} />
              </div>

              {/* COLUMNA DERECHA */}
              <CentroMedicoCard data={centroMedico} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
