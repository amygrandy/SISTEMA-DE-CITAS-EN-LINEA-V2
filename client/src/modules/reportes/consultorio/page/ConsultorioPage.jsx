import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import {
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

import {
  addMonths,
  addDays,
  format,
  parseISO,
  isValid,
  isAfter,
  isBefore,
} from 'date-fns';

import DataTable from '../../../../components/DataTable';
import SearchInput from '../../../../components/SearchInput';
import SelectComponent from '../../../../components/SelectComponent';

import { getColumns } from '../columns';
import { EstablecimientoPage as services } from '../services';

// ========================================
// OPCIONES
// ========================================

const ESTADOS = [
  { value: true, label: 'ATENDIDOS' },
  { value: false, label: 'NO ATENDIDOS' },
];

const TIPOS_FICHA = [
  { value: true, label: 'CITAS EN LÍNEA' },
  { value: false, label: 'SISTEMA DE FICHAS' },
];

// ========================================
// FUNCIONES AUXILIARES
// ========================================

const obtenerFechaActual = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Validar máximo 3 meses calendario.
// Funciona incluso si cambia el año.
const validarRangoReporte = (fechaInicial, fechaFinal) => {
  if (!fechaInicial || !fechaFinal) {
    return '';
  }

  const inicio = parseISO(fechaInicial);
  const fin = parseISO(fechaFinal);

  if (!isValid(inicio) || !isValid(fin)) {
    return 'Las fechas seleccionadas no son válidas.';
  }

  if (isBefore(fin, inicio)) {
    return 'La fecha final no puede ser anterior a la fecha inicial.';
  }

  const fechaMaxima = addMonths(inicio, 3);

  if (isAfter(fin, fechaMaxima)) {
    return 'El rango máximo permitido para generar reportes es de 3 meses.';
  }

  return '';
};

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export default function ConsultorioPage() {
  // ========================================
  // ESTADOS
  // ========================================

  // Tabla
  const [filas, setFilas] = useState([]);
  const [search, setSearch] = useState('');

  // Establecimientos
  const [dataEstablecimiento, setDataEstablecimiento] = useState([]);
  const [selectEstablecimiento, setSelectEstablecimiento] = useState(null);

  // Consultorios
  const [dataConsultorio, setDataConsultorio] = useState([]);
  const [selectConsultorio, setSelectConsultorio] = useState(null);

  // Fechas
  const [fechaInicial, setFechaInicial] = useState(obtenerFechaActual());
  const [fechaFinal, setFechaFinal] = useState(obtenerFechaActual());

  // Filtros
  const [estado, setEstado] = useState(null);
  const [tipoFicha, setTipoFicha] = useState(null);

  // Loading independientes
  const [loadingEstablecimiento, setLoadingEstablecimiento] = useState(false);
  const [loadingConsultorio, setLoadingConsultorio] = useState(false);
  const [loadingReporte, setLoadingReporte] = useState(false);

  // ========================================
  // 1. VALIDAR FECHAS AUTOMÁTICAMENTE
  // ========================================

  const errorFecha = useMemo(() => {
    return validarRangoReporte(fechaInicial, fechaFinal);
  }, [fechaInicial, fechaFinal]);

  // Fecha límite informativa
  const fechaMaxima = useMemo(() => {
    if (!fechaInicial) return '';

    const inicio = parseISO(fechaInicial);

    if (!isValid(inicio)) return '';

    return format(addMonths(inicio, 3), 'dd/MM/yyyy');
  }, [fechaInicial]);

  // ========================================
  // 2. CARGAR ESTABLECIMIENTOS
  // ========================================

  useEffect(() => {
    let activo = true;

    const cargarEstablecimientos = async () => {
      try {
        setLoadingEstablecimiento(true);

        const response = await services.getSelectEstablecimiento();

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudieron cargar los establecimientos',
          );
        }

        if (!activo) return;

        setDataEstablecimiento(
          Array.isArray(response.data) ? response.data : [],
        );
      } catch (error) {
        if (!activo) return;

        toast.error(error.message || 'Error al cargar establecimientos');
      } finally {
        if (activo) {
          setLoadingEstablecimiento(false);
        }
      }
    };

    cargarEstablecimientos();

    return () => {
      activo = false;
    };
  }, []);

  // ========================================
  // 3. CARGAR CONSULTORIOS
  // ========================================

  useEffect(() => {
    let activo = true;

    setDataConsultorio([]);
    setLoadingConsultorio(false);

    if (selectEstablecimiento == null) {
      return () => {
        activo = false;
      };
    }

    const cargarConsultorios = async () => {
      try {
        setLoadingConsultorio(true);

        const response = await services.getConsultorioByEstablecimiento({
          id: selectEstablecimiento,
        });

        if (!response.ok) {
          throw new Error(
            response.message || 'No se pudieron cargar los consultorios',
          );
        }

        if (!activo) return;

        setDataConsultorio(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (!activo) return;

        toast.error(error.message || 'Error al cargar consultorios');
      } finally {
        if (activo) {
          setLoadingConsultorio(false);
        }
      }
    };

    cargarConsultorios();

    return () => {
      activo = false;
    };
  }, [selectEstablecimiento]);

  // ========================================
  // 4. VALIDAR FILTROS
  // ========================================

  const filtrosCompletos = useMemo(() => {
    return (
      selectEstablecimiento != null &&
      selectConsultorio != null &&
      Boolean(fechaInicial) &&
      Boolean(fechaFinal) &&
      estado !== null &&
      tipoFicha !== null &&
      errorFecha === ''
    );
  }, [
    selectEstablecimiento,
    selectConsultorio,
    fechaInicial,
    fechaFinal,
    estado,
    tipoFicha,
    errorFecha,
  ]);

  // ========================================
  // 5. CARGAR REPORTE AUTOMÁTICAMENTE
  // ========================================

  useEffect(() => {
    let activo = true;

    setFilas([]);
    setLoadingReporte(false);

    // No consultar si faltan filtros o las fechas son inválidas
    if (!filtrosCompletos) {
      return () => {
        activo = false;
      };
    }

    const cargarReporte = async () => {
      try {
        setLoadingReporte(true);

        // El backend usa un límite superior exclusivo:
        // cit_fecha_ini < fecha_final
        // Por eso sumamos un día a la fecha final.
        const fechaFinalConsulta = format(
          addDays(parseISO(fechaFinal), 1),
          'yyyy-MM-dd',
        );

        const response = await services.getAllReporte({
          establecimiento_id: selectEstablecimiento,
          consultorio_id: selectConsultorio,
          fecha_inicial: fechaInicial,
          fecha_final: fechaFinalConsulta,
          estado,
          tipo_cita: tipoFicha,
        });

        console.log(response);

        if (!response.ok) {
          throw new Error(response.message || 'No se pudo obtener el reporte');
        }

        if (!activo) return;

        setFilas(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (!activo) return;

        setFilas([]);

        toast.error(error.message || 'Error al obtener el reporte');
      } finally {
        if (activo) {
          setLoadingReporte(false);
        }
      }
    };

    cargarReporte();

    return () => {
      activo = false;
    };
  }, [
    selectEstablecimiento,
    selectConsultorio,
    fechaInicial,
    fechaFinal,
    estado,
    tipoFicha,
    filtrosCompletos,
  ]);

  // ========================================
  // 6. FILTRAR FILAS
  // ========================================

  const filasFiltradas = useMemo(() => {
    const texto = search.trim().toLowerCase();

    if (!texto) return filas;

    return filas.filter((fila) => {
      const campos = [
        fila.paciente,
        fila.consultorio,
        fila.tipo_cita,
        fila.idfichaprogramada,
        fila.fip_estado,
      ];

      return campos.some((campo) =>
        String(campo ?? '')
          .toLowerCase()
          .includes(texto),
      );
    });
  }, [filas, search]);

  const columns = useMemo(() => getColumns(), []);

  // ========================================
  // 7. MANEJADORES
  // ========================================

  const handleEstablecimiento = (e) => {
    setSelectEstablecimiento(e.target.value);
    setSelectConsultorio(null);
    setDataConsultorio([]);
    setFilas([]);
  };

  const handleConsultorio = (e) => {
    setSelectConsultorio(e.target.value);
  };

  const handleEstado = (e) => {
    setEstado(e.target.value);
  };

  const handleTipoFicha = (e) => {
    setTipoFicha(e.target.value);
  };

  const handleFecha = (campo, valor) => {
    if (campo === 'fechaInicial') {
      setFechaInicial(valor);
    }

    if (campo === 'fechaFinal') {
      setFechaFinal(valor);
    }

    // El error se calcula automáticamente
    // cuando cambian las fechas.
  };

  const limpiarFiltros = () => {
    setSelectEstablecimiento(null);
    setSelectConsultorio(null);
    setDataConsultorio([]);

    setFechaInicial(obtenerFechaActual());
    setFechaFinal(obtenerFechaActual());

    setEstado(null);
    setTipoFicha(null);

    setSearch('');
    setFilas([]);
  };

  // ========================================
  // 8. RENDER
  // ========================================

  return (
    <div className="space-y-6">
      {/* ENCABEZADO */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Reporte de fichas programadas
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Consulta y seguimiento de las fichas médicas.
          </p>
        </div>

        <button
          type="button"
          onClick={limpiarFiltros}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Limpiar filtros
        </button>
      </div>

      {/* ========================================
          FILTROS
      ======================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {/* TÍTULO */}
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-2.5">
            <FunnelIcon className="h-5 w-5 text-[#245249]" />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Filtros de búsqueda</h2>

            <p className="text-xs text-slate-500">
              Selecciona los criterios para consultar las fichas.
            </p>
          </div>
        </div>

        {/* CAMPOS */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* ESTABLECIMIENTO */}
          <SelectComponent
            label="Establecimiento"
            name="establecimiento_id"
            placeholder={
              loadingEstablecimiento
                ? 'Cargando establecimientos...'
                : 'Seleccionar establecimiento'
            }
            options={dataEstablecimiento}
            value={selectEstablecimiento}
            onChange={handleEstablecimiento}
            isDisabled={loadingEstablecimiento}
          />

          {/* CONSULTORIO */}
          <SelectComponent
            label="Consultorio"
            name="consultorio_id"
            placeholder={
              loadingConsultorio
                ? 'Cargando consultorios...'
                : 'Seleccionar consultorio'
            }
            options={dataConsultorio}
            value={selectConsultorio}
            onChange={handleConsultorio}
            isDisabled={selectEstablecimiento == null || loadingConsultorio}
          />

          {/* ====================================
              GRUPO DE FECHAS
          ==================================== */}

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* FECHA INICIAL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fecha inicial
                </label>

                <input
                  type="date"
                  value={fechaInicial}
                  onChange={(e) => handleFecha('fechaInicial', e.target.value)}
                  aria-invalid={Boolean(errorFecha)}
                  className={`h-11.5 w-full rounded-[14px] border px-4 text-sm outline-none transition
                    ${
                      errorFecha
                        ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-300 bg-white focus:border-[#245249] focus:ring-2 focus:ring-emerald-100'
                    }
                  `}
                />
              </div>

              {/* FECHA FINAL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fecha final
                </label>

                <input
                  type="date"
                  value={fechaFinal}
                  onChange={(e) => handleFecha('fechaFinal', e.target.value)}
                  disabled={!fechaInicial}
                  aria-invalid={Boolean(errorFecha)}
                  aria-describedby="mensaje-rango-fechas"
                  className={`h-11.5 w-full rounded-[14px] border px-4 text-sm outline-none transition
                    ${
                      errorFecha
                        ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-300 bg-white focus:border-[#245249] focus:ring-2 focus:ring-emerald-100'
                    }
                  `}
                />
              </div>
            </div>

            {/* ====================================
                MENSAJE DE VALIDACIÓN
            ==================================== */}

            <div id="mensaje-rango-fechas" className="mt-3" aria-live="polite">
              {errorFecha ? (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5"
                >
                  <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                  <div>
                    <p className="text-xs font-bold text-red-700">
                      Rango de fechas no permitido
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-red-600">
                      {errorFecha}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                  <InformationCircleIcon className="h-4 w-4 shrink-0 text-slate-400" />

                  <p className="text-xs leading-5 text-slate-500">
                    El rango máximo permitido es de 3 meses.
                    {fechaMaxima && <> Fecha límite: {fechaMaxima}.</>}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ESTADO */}
          <SelectComponent
            label="Estado de ficha"
            name="estado"
            placeholder="Seleccionar estado"
            options={ESTADOS}
            value={estado}
            onChange={handleEstado}
          />

          {/* TIPO DE FICHA */}
          <SelectComponent
            label="Origen de la cita"
            name="tipo_cita"
            placeholder="Seleccionar origen"
            options={TIPOS_FICHA}
            value={tipoFicha}
            onChange={handleTipoFicha}
          />
        </div>
      </section>

      {/* ========================================
          RESULTADOS
      ======================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* ENCABEZADO DE TABLA */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5">
                <ClipboardDocumentListIcon className="h-6 w-6 text-[#245249]" />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">Fichas programadas</h2>

                <p className="text-xs text-slate-500">
                  {loadingReporte
                    ? 'Consultando registros...'
                    : `${filasFiltradas.length} registros encontrados`}
                </p>
              </div>
            </div>

            <div className="w-full md:max-w-xs">
              <SearchInput value={search} onChange={setSearch} />
            </div>
          </div>
        </div>

        {/* CONTENIDO DE TABLA */}
        <div className="p-4 sm:p-5">
          {!filtrosCompletos && !loadingReporte ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-2xl bg-emerald-50 p-4">
                <MagnifyingGlassIcon className="h-9 w-9 text-[#245249]" />
              </div>

              <h3 className="text-base font-bold text-slate-700">
                {errorFecha
                  ? 'Corrige el rango de fechas'
                  : 'Configura los filtros'}
              </h3>

              <p className="mt-2 max-w-sm text-sm text-slate-500">
                {errorFecha
                  ? 'El periodo seleccionado no es válido. Corrige las fechas para consultar las fichas.'
                  : 'Selecciona el establecimiento, consultorio, fechas, estado y origen para visualizar las fichas programadas.'}
              </p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filasFiltradas}
              loading={loadingReporte}
            />
          )}
        </div>
      </section>
    </div>
  );
}
