export const formatDateText = (date) => {
  if (!date) return '';

  return new Intl.DateTimeFormat('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
};

export function sumarDias(dias) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().split('T')[0];
}

const DIAS_SEMANA = {
  0: 'DOMINGO',
  1: 'LUNES',
  2: 'MARTES',
  3: 'MIERCOLES',
  4: 'JUEVES',
  5: 'VIERNES',
  6: 'SABADO',
};

const formatearFecha = (fecha) => {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const obtenerFechasHabilitadas = ({
  anticipacionDias,
  diasHabilitados,
  incluirHoy = false,
}) => {
  const fechas = [];

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  let diasRecorridos = incluirHoy ? 0 : 1;

  while (fechas.length < anticipacionDias) {
    const fecha = new Date(hoy);

    fecha.setDate(hoy.getDate() + diasRecorridos);

    const numeroDia = fecha.getDay();
    const nombreDia = DIAS_SEMANA[numeroDia];

    if (diasHabilitados.includes(nombreDia)) {
      fechas.push({
        fecha: formatearFecha(fecha),
        dia: nombreDia,
      });
    }

    diasRecorridos++;
  }

  return fechas;
};

// const DIAS_SEMANA = {
//   0: 'DOMINGO',
//   1: 'LUNES',
//   2: 'MARTES',
//   3: 'MIERCOLES',
//   4: 'JUEVES',
//   5: 'VIERNES',
//   6: 'SABADO',
// };

// const formatearFecha = (fecha) => {
//   const year = fecha.getFullYear();
//   const month = String(fecha.getMonth() + 1).padStart(2, '0');
//   const day = String(fecha.getDate()).padStart(2, '0');

//   return `${year}-${month}-${day}`;
// };

// export const obtenerProximasFechasHabilitadas = ({
//   cantidadFechas,
//   diasHabilitados,
//   incluirHoy = false,
// }) => {
//   const fechas = [];

//   const hoy = new Date();
//   hoy.setHours(0, 0, 0, 0);

//   let diasAvanzados = incluirHoy ? 0 : 1;

//   while (fechas.length < cantidadFechas) {
//     const fecha = new Date(hoy);
//     fecha.setDate(hoy.getDate() + diasAvanzados);

//     const numeroDia = fecha.getDay();
//     const nombreDia = DIAS_SEMANA[numeroDia];

//     if (diasHabilitados.includes(nombreDia)) {
//       fechas.push({
//         fecha: formatearFecha(fecha),
//         dia: nombreDia,
//       });
//     }

//     diasAvanzados++;
//   }

//   return fechas;
// };
// export const obtenerFechasHabilitadas = ({
//   anticipacionDias,
//   diasHabilitados,
//   incluirHoy = false,
// }) => {
//   const fechas = [];

//   const hoy = new Date();
//   hoy.setHours(0, 0, 0, 0);

//   const inicio = incluirHoy ? 0 : 1;

//   for (let i = inicio; i <= anticipacionDias; i++) {
//     const fecha = new Date(hoy);
//     fecha.setDate(hoy.getDate() + i);

//     const numeroDia = fecha.getDay();
//     const nombreDia = DIAS_SEMANA[numeroDia];

//     if (diasHabilitados.includes(nombreDia)) {
//       fechas.push({
//         fecha: formatearFecha(fecha),
//         dia: nombreDia,
//       });
//     }
//   }

//   return fechas;
// };

export const obtenerFechaHoy = () => {
  const fecha = new Date();

  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
};

export const separarFechaHora = (valor) => {
  if (!valor) {
    return {
      fecha: null,
      hora: null,
    };
  }

  const fechaISO = valor instanceof Date ? valor.toISOString() : String(valor);

  const [fecha, tiempo] = fechaISO.split('T');

  return {
    fecha,
    hora: tiempo.slice(0, 5),
  };
};

export const formatearFechaDos = (valor) => {
  if (!valor) return '';

  const fecha = valor instanceof Date ? valor : new Date(valor);

  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  return `${fecha.getUTCDate()} de ${
    meses[fecha.getUTCMonth()]
  } del ${fecha.getUTCFullYear()}`;
};

export const puedeCancelarFicha = ({ fechaFicha, minutos = 30 }) => {
  const fechaOriginal = new Date(fechaFicha);

  if (Number.isNaN(fechaOriginal.getTime())) {
    throw new Error('Fecha inválida');
  }

  // Corrección temporal SOLO cuando el valor fue
  // interpretado como UTC, pero originalmente era hora boliviana.
  const fechaCita = new Date(fechaOriginal.getTime() + 4 * 60 * 60 * 1000);

  const fechaActual = new Date();

  const fechaLimite = new Date(fechaCita.getTime() - minutos * 60 * 1000);

  const diferenciaMinutos =
    (fechaCita.getTime() - fechaActual.getTime()) / 60000;

  console.log('Fecha cita:', fechaCita);
  console.log('Fecha actual:', fechaActual);
  console.log('Fecha límite:', fechaLimite);
  console.log('Minutos restantes:', diferenciaMinutos);

  return {
    puedeCancelar: fechaActual.getTime() < fechaLimite.getTime(),

    minutosRestantes: Math.max(
      0,
      Math.ceil((fechaCita.getTime() - fechaActual.getTime()) / 60000),
    ),

    minutosParaCancelar: Math.max(
      0,
      Math.ceil((fechaLimite.getTime() - fechaActual.getTime()) / 60000),
    ),

    fechaLimite,
  };
};
export const formatearFechaQuitarGuines = (fecha) => {
  return fecha.replaceAll('-', '');
};

export const aumentarUnDia = (fecha) => {
  const date = new Date(`${fecha}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);

  return date.toISOString().slice(0, 10).replaceAll('-', '');
};

// const separarFechaHora = (valor) => {
//   if (!valor) {
//     return {
//       fecha: null,
//       hora: null,
//     };
//   }

//   const fechaISO = valor instanceof Date ? valor.toISOString() : String(valor);

//   const [fecha, tiempo] = fechaISO.split('T');

//   return {
//     fecha,
//     hora: tiempo.slice(0, 5),
//   };
// };

// export const formatearFechaDos = (valor) => {
//   if (!valor) return '';

//   const fecha = valor instanceof Date ? valor : new Date(valor);

//   const meses = [
//     'enero',
//     'febrero',
//     'marzo',
//     'abril',
//     'mayo',
//     'junio',
//     'julio',
//     'agosto',
//     'septiembre',
//     'octubre',
//     'noviembre',
//     'diciembre',
//   ];

//   return `${fecha.getUTCDate()} de ${
//     meses[fecha.getUTCMonth()]
//   } del ${fecha.getUTCFullYear()}`;
// };
