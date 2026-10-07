import { HorarioHabilitacionModel } from '../../../models/horarioHabilitacion.model.js';

export class HorarioHabilitacionRespository {
  static async getById({ id = 1, transaction = null } = {}) {
    const data = await HorarioHabilitacionModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
      transaction,
    });
    return data;
  }
  static async update({ id = 1, payload, transaction = null }) {
    const data = await HorarioHabilitacionModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }
    await data.update(payload, { transaction });
    return data;
  }
  static async EstaHabilitado({ transaction = null } = {}) {
    const data = await HorarioHabilitacionModel.findByPk(1, { transaction });
    if (estaEnRango(data.hora_inicio, data.hora_final)) {
      return true;
    } else {
      return false;
    }
  }
}

function estaEnRango(horaInicio, horaFin, timeZone = 'America/La_Paz') {
  const inicio = timeToMinutes(horaInicio);
  const fin = timeToMinutes(horaFin);
  const actual = ahoraEnMinutos(timeZone);

  // Caso normal (mismo día): 08:00 - 12:00
  if (inicio <= fin) {
    return actual >= inicio && actual <= fin;
  }

  // Caso que cruza medianoche: 22:00 - 02:00
  return actual >= inicio || actual <= fin;
}
function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}
function ahoraEnMinutos(timeZone = 'America/La_Paz') {
  const ahora = new Date();
  const hh = Number(
    ahora.toLocaleString('en-US', { hour: '2-digit', hour12: false, timeZone }),
  );
  const mm = Number(
    ahora.toLocaleString('en-US', { minute: '2-digit', timeZone }),
  );
  return hh * 60 + mm;
}
