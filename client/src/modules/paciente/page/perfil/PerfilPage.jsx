import { useEffect, useState } from 'react';
import DatosPersonalesCard from '../../components/DatosPersonalesCard';
import EmpresaCard from '../../components/EmpresaCard';
import CentroMedicoCard from '../../components/CentroMedicoCard';
import { toast } from 'react-toastify';
import { PerfilService } from './perfil.services';

export default function PerfilPage() {
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState({});
  const [empresa, setEmpresa] = useState({});
  const [centroMedico, setCentroMedico] = useState({});

  useEffect(() => {
    const dataLoad = async () => {
      try {
        setLoading(true);

        const response = await PerfilService.getPerfilAsegurado();
        if (!response.ok) {
          throw new Error(response.message || 'No se pudo obtener el perfil ');
        }

        setPerfil(response.data.perfil ?? {});
        setEmpresa(response.data.empresa ?? {});
        setCentroMedico(response.data.centroMedico ?? {});
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message || 'No se pudo obtener el perfil');
        } else {
          toast.error('Algo salió mal, inténtelo más tarde');
        }
      } finally {
        setLoading(false);
      }
    };

    dataLoad();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              h-12 w-12
              animate-spin
              rounded-full
              border-4 border-slate-200
              border-t-[#064135]
            "
          />

          <div className="text-center">
            <p className="font-semibold text-slate-700">Cargando perfil</p>

            <p className="mt-1 text-sm text-slate-500">
              Obteniendo información del asegurado...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-w-0">
      <div
        className="
          min-h-full w-full min-w-0
          rounded-2xl bg-white
          p-4 shadow-sm
          sm:p-5
          md:p-6
          lg:p-7
        "
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
              lg:text-xl
            "
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
