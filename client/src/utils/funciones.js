import { addMonths, isAfter, isBefore, parseISO, isValid } from 'date-fns';
export const formatearFechaHoraFicha = (valor) => {
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) {
    return valor;
  }
  return new Intl.DateTimeFormat('es-BO', {
    timeZone: 'America/La_Paz',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(fecha);
};

// export const validarRangoReporte = (fechaInicial, fechaFinal) => {
//   if (!fechaInicial || !fechaFinal) return false;

//   const inicio = parseISO(fechaInicial);
//   const fin = parseISO(fechaFinal);

//   if (!isValid(inicio) || !isValid(fin)) return false;

//   const fechaMaxima = addMonths(inicio, 3);

//   return !isBefore(fin, inicio) && !isAfter(fin, fechaMaxima);
// };

export const validarRangoReporte = (fechaInicial, fechaFinal) => {
  if (!fechaInicial || !fechaFinal) return false;

  const inicio = parseISO(fechaInicial);
  const fin = parseISO(fechaFinal);

  if (!isValid(inicio) || !isValid(fin)) return false;

  if (isBefore(fin, inicio)) {
    throw new Error('La fecha final no puede ser anterior a la fecha inicial.');
  }

  if (isAfter(fin, addMonths(inicio, 3))) {
    throw new Error(
      'El rango máximo permitido para generar reportes es de 3 meses.',
    );
  }

  return true;
};
