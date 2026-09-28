export const formatDateText = (date) => {
  if (!date) return '';

  return new Intl.DateTimeFormat('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
};
