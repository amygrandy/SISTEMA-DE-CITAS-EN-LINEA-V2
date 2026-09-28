import { useEffect, useState } from 'react';
import {
  UserGroupIcon,
  ClockIcon,
  IdentificationIcon,
  HeartIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import { BeneficiarioServices } from './Beneficiarios.services';
import { toast } from 'react-toastify';
import { formatDateText } from '../../../../utils/funcionesZod';

export default function BeneficiariosPage() {
  // const beneficiarios = [
  //   {
  //     id: 1,
  //     matricula: '1025487',
  //     ci: '8456123 CB',
  //     nombres: 'María Fernanda',
  //     primer_apellido: 'Chávez',
  //     segundo_apellido: 'Rojas',
  //     parentesco: 'Hija',
  //     afiliacion: 'Activa',
  //     fechaNacimiento: '12/03/2012',
  //   },
  //   {
  //     id: 2,
  //     matricula: '1025488',
  //     ci: '6987451 CB',
  //     nombres: 'Ana Lucía',
  //     primer_apellido: 'Torrez',
  //     segundo_apellido: 'Vargas',
  //     parentesco: 'Esposa',
  //     afiliacion: 'Activa',
  //     fechaNacimiento: '28/11/1990',
  //   },
  //   {
  //     id: 3,
  //     matricula: '1025489',
  //     ci: '7412589 CB',
  //     nombres: 'Luis Alberto',
  //     primer_apellido: 'Chávez',
  //     segundo_apellido: 'Rojas',
  //     parentesco: 'Hijo',
  //     afiliacion: 'Pendiente',
  //     fechaNacimiento: '04/07/2018',
  //   },
  //   {
  //     id: 4,
  //     matricula: '1025490',
  //     ci: '9632587 CB',
  //     nombres: 'Julia Elena',
  //     primer_apellido: 'Torrez',
  //     segundo_apellido: 'Mendoza',
  //     parentesco: 'Madre',
  //     afiliacion: 'Inactiva',
  //     fechaNacimiento: '09/02/1963',
  //   },
  // ];
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const dataLoad = async () => {
        const response = await BeneficiarioServices.getBeneficiarios();
        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudo obtener los asegurados',
          );
        }
        setBeneficiarios(Array.isArray(response.data) ? response.data : []);
      };
      dataLoad();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message || 'No se pudo obtener el perfil');
      } else {
        toast.error('Algo salió mal, inténtelo más tarde');
      }
    } finally {
      setLoading(false);
    }
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
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-3xl border border-[#d8e4e1] bg-linear-to-r from-white via-white to-[#edf5f3] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#4f7c73]">
              Asegurado
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-800">
              Beneficiarios
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Consulta a tus beneficiarios registrados, revisa su estado de
              afiliación y accede rápidamente a su información principal.
            </p>
          </div>
        </div>
      </section>

      {/* LISTA */}
      <section className="grid gap-5 lg:grid-cols-2">
        {beneficiarios.map((item) => (
          <BeneficiarioCard key={item.idpoblacion} item={item} />
        ))}
      </section>

      {beneficiarios.length === 0 && (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <UserGroupIcon className="h-8 w-8 text-slate-400" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-700">
            No se encontraron beneficiarios
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Prueba con otro criterio de búsqueda.
          </p>
        </section>
      )}
    </div>
  );
}

function BeneficiarioCard({ item }) {
  const initials =
    item?.nombre_completo
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0])
      .join('') || NN;

  return (
    <article
      className="
        group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm
        transition duration-200 hover:-translate-y-0.5 hover:border-[#aec7c1] hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="
              flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl
              bg-linear-to-br from-[#245249] to-[#4f7c73]
              text-lg font-bold text-white shadow-sm
            "
          >
            {initials.toUpperCase()}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-800">
                {item?.nombre_completo || ''}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <InfoChip
          icon={CreditCardIcon}
          label="Matrícula"
          value={item.pac_codigo}
          color="emerald"
        />

        <InfoChip
          icon={IdentificationIcon}
          label="Documento"
          value={item.cedula_identidad}
          color="sky"
        />

        <InfoChip
          icon={HeartIcon}
          label="Parentesco"
          value={item.parentesco.split('-')[1]?.trim()}
          color="pink"
        />

        <InfoChip
          icon={ClockIcon}
          label="Nacimiento"
          value={formatDateText(item.pac_fecha_nac || '')}
          color="amber"
        />
      </div>

      {/* <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="
            inline-flex items-center gap-2 rounded-xl
            bg-[#245249] px-4 py-2.5 text-sm font-semibold text-white
            transition hover:bg-[#1f443e]
          "
        >
          <EyeIcon className="h-4 w-4" />
          Ver detalle
        </button>

        <button
          type="button"
          className="
            inline-flex items-center gap-2 rounded-xl
            border border-slate-200 bg-white px-4 py-2.5
            text-sm font-semibold text-slate-700
            transition hover:bg-slate-50
          "
        >
          <PencilSquareIcon className="h-4 w-4" />
          Editar
        </button>
      </div> */}
    </article>
  );
}

function InfoChip({ icon: Icon, label, value, color = 'emerald' }) {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-600',
    sky: 'bg-sky-50 text-sky-600',
    pink: 'bg-pink-50 text-pink-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
