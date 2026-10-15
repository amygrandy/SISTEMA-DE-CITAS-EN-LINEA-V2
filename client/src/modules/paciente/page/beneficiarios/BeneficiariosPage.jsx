import { useEffect, useState } from 'react';
import {
  UserGroupIcon,
  ClockIcon,
  IdentificationIcon,
  HeartIcon,
  CreditCardIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import { BeneficiarioServices } from './Beneficiarios.services';
import { toast } from 'react-toastify';
import { formatDateText } from '../../../../utils/funcionesZod';

export default function BeneficiariosPage() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  // =========================================================
  // CARGAR BENEFICIARIOS
  // =========================================================

  useEffect(() => {
    let ignorarRespuesta = false;

    const cargarBeneficiarios = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await BeneficiarioServices.getBeneficiarios();

        if (ignorarRespuesta) return;

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudieron obtener los beneficiarios',
          );
        }

        setBeneficiarios(Array.isArray(response.data) ? response.data : []);
      } catch (e) {
        if (ignorarRespuesta) return;

        const mensaje =
          e instanceof Error
            ? e.message
            : 'Algo salió mal, inténtelo más tarde';

        setBeneficiarios([]);
        setError(mensaje);

        toast.error(mensaje);
      } finally {
        if (!ignorarRespuesta) {
          setLoading(false);
        }
      }
    };

    cargarBeneficiarios();

    return () => {
      ignorarRespuesta = true;
    };
  }, [refresh]);

  // =========================================================
  // RENDER
  // =========================================================

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

          {/* INDICADOR DE CARGA */}
          {loading && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#245249]">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Cargando beneficiarios...
            </div>
          )}
        </div>
      </section>

      {/* CONTENIDO */}
      {loading ? (
        <BeneficiariosSkeleton />
      ) : error ? (
        <section className="rounded-3xl border border-red-200 bg-red-50/50 p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
            <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-700">
            No se pudieron cargar los beneficiarios
          </h3>

          <p className="mt-2 text-sm text-slate-500">{error}</p>

          <button
            type="button"
            onClick={() => setRefresh((current) => current + 1)}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#245249] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f443e]"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Reintentar
          </button>
        </section>
      ) : beneficiarios.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <UserGroupIcon className="h-8 w-8 text-slate-400" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-700">
            No se encontraron beneficiarios
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Actualmente no tienes beneficiarios registrados.
          </p>
        </section>
      ) : (
        <section className="grid gap-5 lg:grid-cols-2">
          {beneficiarios.map((item, index) => (
            <BeneficiarioCard key={item.idpoblacion ?? index} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}

// =========================================================
// TARJETA DEL BENEFICIARIO
// =========================================================

function BeneficiarioCard({ item }) {
  const initials =
    String(item?.nombre_completo || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((palabra) => palabra[0])
      .join('')
      .toUpperCase() || 'NN';

  const parentesco = item?.parentesco
    ? String(item.parentesco).split('-').slice(1).join('-').trim() ||
      String(item.parentesco).trim()
    : 'No registrado';

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
            {initials}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-800">
                {item?.nombre_completo || 'Sin nombre registrado'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <InfoChip
          icon={CreditCardIcon}
          label="Matrícula"
          value={item?.pac_codigo}
          color="emerald"
        />

        <InfoChip
          icon={IdentificationIcon}
          label="Documento"
          value={item?.cedula_identidad}
          color="sky"
        />

        <InfoChip
          icon={HeartIcon}
          label="Parentesco"
          value={parentesco}
          color="pink"
        />

        <InfoChip
          icon={ClockIcon}
          label="Nacimiento"
          value={
            item?.pac_fecha_nac
              ? formatDateText(item.pac_fecha_nac)
              : 'No registrado'
          }
          color="amber"
        />
      </div>
    </article>
  );
}

// =========================================================
// TARJETA DE INFORMACIÓN
// =========================================================

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

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="truncate text-sm font-semibold text-slate-700">
          {value ?? 'No registrado'}
        </p>
      </div>
    </div>
  );
}

// =========================================================
// SKELETON PARA BENEFICIARIOS
// =========================================================

function BeneficiariosSkeleton() {
  return (
    <section
      className="grid gap-5 lg:grid-cols-2"
      role="status"
      aria-label="Cargando beneficiarios"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          {/* ENCABEZADO */}
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-slate-200" />

            <div className="flex-1 space-y-3 pt-2">
              <div className="h-4 w-3/4 rounded-full bg-slate-200" />
              <div className="h-3 w-1/2 rounded-full bg-slate-100" />
            </div>
          </div>

          {/* DATOS */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, chipIndex) => (
              <div
                key={chipIndex}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-2.5 w-1/2 rounded-full bg-slate-200" />

                  <div className="h-3.5 w-3/4 rounded-full bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <span className="sr-only">
        Obteniendo información de los beneficiarios...
      </span>
    </section>
  );
}
