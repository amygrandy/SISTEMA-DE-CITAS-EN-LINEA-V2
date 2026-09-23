import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserGroupIcon,
  IdentificationIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { FamiliaServices } from '../familia.services';

const personas = [
  {
    id: 1,
    nombre: 'Juan Carlos Pérez',
    ci: '8658154',
    parentesco: 'Titular',
    tipo: 'ASEGURADO',
    fechaNacimiento: '15/08/1985',
    edad: 41,
    codigoSeguro: 'SEG-000154',
  },
  {
    id: 2,
    nombre: 'María López Pérez',
    ci: '7458214',
    parentesco: 'Esposa',
    tipo: 'BENEFICIARIO',
    fechaNacimiento: '20/04/1988',
    edad: 38,
    codigoSeguro: 'SEG-000155',
  },
];

export default function FamiliaPage() {
  const navigate = useNavigate();
  const [personasFamilia, setPersonasFamilia] = useState(null);

  useEffect(() => {
    const dataLoad = async () => {
      const response = await FamiliaServices.getFamiliaAsegurados();
      setPersonasFamilia(Array.isArray(response.data) ? response.data : []);
    };
    dataLoad();
  }, []);

  const seleccionarPersona = (persona) => {
    console.log(persona);
    navigate(`/paciente/historial`, {
      state: {
        persona,
      },
    });
  };

  const abrirHistorial = (persona) => {
    navigate(`/paciente/historial`, {
      state: {
        persona,
      },
    });
  };

  const reservarFicha = (persona) => {
    navigate(`/paciente/historial`);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#005B57]">Bienvenido</p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Mi grupo familiar
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Seleccione al asegurado o beneficiario para consultar su historial
          médico o reservar una nueva ficha.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <ResumenCard
          titulo="Personas aseguradas"
          valor={personasFamilia?.length ?? 'Cargando'}
          icon={<UserGroupIcon className="h-6 w-6" />}
        />

        <ResumenCard
          titulo="Asegurado titular"
          valor="1"
          icon={<IdentificationIcon className="h-6 w-6" />}
        />

        <ResumenCard
          titulo="Beneficiarios"
          valor={personasFamilia?.length - 1 || 'Cargando'}
          icon={<UserIcon className="h-6 w-6" />}
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">
          Personas registradas
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Gestione la atención médica de cada integrante.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {personasFamilia?.map((persona) => (
          <PersonaCard
            key={persona.idpoblacion}
            persona={persona}
            seleccionar={() => seleccionarPersona(persona)}
            historial={() => abrirHistorial(persona)}
            reservar={() => reservarFicha(persona)}
          />
        ))}
      </div>
    </main>
  );
}

function ResumenCard({ titulo, valor, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF5F3] text-[#005B57]">
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-500">{titulo}</p>

          <p className="mt-1 text-2xl font-bold text-slate-900">{valor}</p>
        </div>
      </div>
    </div>
  );
}

function PersonaCard({ persona, seleccionar, historial, reservar }) {
  const esTitular = persona.pac_codigo?.endsWith('ID') ?? false;
  const parentesco = persona.parentesco?.split('-')[1];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={seleccionar}
        className="w-full p-5 text-left"
      >
        <div className="flex items-start gap-4">
          <Avatar nombre={persona.nombre_completo} />

          <div className="min-w-0 flex-1">
            <div className="mb-2">
              {esTitular ? (
                <span className="inline-flex rounded-full bg-[#EAF5F3] px-2.5 py-1 text-xs font-semibold text-[#005B57]">
                  Asegurado titular
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-[#F8EAE2] px-2.5 py-1 text-xs font-semibold text-[#9A5E3D]">
                  Beneficiario
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold leading-6 text-slate-900 line-clamp-2">
              {persona.nombre_completo}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              CI: {persona.cedula_identidad}
            </p>

            <p className="mt-0.5 text-sm text-slate-500">{parentesco}</p>
          </div>

          <ChevronRightIcon className="h-5 w-5 shrink-0 text-slate-400" />
        </div>
      </button>

      <div className="border-t border-slate-100 bg-slate-50 p-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={historial}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#005B57] hover:text-[#005B57]"
          >
            <ClipboardDocumentListIcon className="h-5 w-5" />
            Historial
          </button>

          <button
            type="button"
            onClick={reservar}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#005B57] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004744]"
          >
            <CalendarDaysIcon className="h-5 w-5" />
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}

function Avatar({ nombre }) {
  const iniciales = obtenerIniciales(nombre);

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF5F3] text-lg font-bold text-[#005B57]">
      {iniciales}
    </div>
  );
}
function obtenerIniciales(nombre) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase();
}
