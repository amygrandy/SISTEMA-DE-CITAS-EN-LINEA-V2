import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

export const PacienteSancionadoModel = sequelize.define('PacienteSancionado', {
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
  poblacion_id: { type: DataTypes.INTEGER, allowNull: false },
  cantidad_faltas: { type: DataTypes.INTEGER, allowNull: false },
  fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
  estado: { type: DataTypes.ENUM('ACTIVA', 'CUMPLIDA', 'EN_PROCESO') },
});
