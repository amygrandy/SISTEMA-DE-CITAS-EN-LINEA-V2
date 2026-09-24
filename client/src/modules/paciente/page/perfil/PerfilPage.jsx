import DatosPersonalesCard from '../../components/DatosPersonalesCard';
import EmpresaCard from '../../components/EmpresaCard';
import CentroMedicoCard from '../../components/CentroMedicoCard';
import PlanillaAportesCard from '../../components/PlanillaAportesCard';

export default function PerfilPage() {
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
    <main className="w-full min-w-0 ">
      <div
        className="
          min-h-full w-full min-w-0
          rounded-2xl bg-white
          p-4 shadow-sm
          sm:p-5
          md:p-6
          lg:p-7"
      >
        {/* TÍTULO */}
        <div className="mb-4 min-w-0">
          <h1 className="text-xl font-bold text-slate-700 sm:text-2xl">
            Mi Perfil
          </h1>

          <p
            className="
              mt-1 wrap-break-word
              text-base font-semibold text-slate-500
              sm:text-lg
              lg:text-xl"
          >
            {perfil.nombreCompleto}
          </p>
        </div>

        {/* DATOS PERSONALES */}
        <div className="min-w-0">
          <DatosPersonalesCard data={perfil} />
        </div>

        {/* INFORMACIÓN INFERIOR */}
        <div
          className="
            mt-4 grid min-w-0 grid-cols-1
            items-start gap-4
            xl:grid-cols-2
          "
        >
          {/* COLUMNA IZQUIERDA */}
          <div className="min-w-0 space-y-4">
            <div className="min-w-0">
              <EmpresaCard data={empresa} />
            </div>

            {/* <div className="min-w-0">
              <PlanillaAportesCard data={planillas} />
            </div> */}
          </div>

          {/* COLUMNA DERECHA */}
          <div className="min-w-0">
            <CentroMedicoCard data={centroMedico} />
          </div>
        </div>
      </div>
    </main>
  );
}
