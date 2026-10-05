import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const SancionInasistenciaModel = sequelize.define(
  'ControlInasistencia',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad_inasistencia: { type: DataTypes.INTEGER, allowNull: false },
    rango_dias: { type: DataTypes.INTEGER, allowNull: false },
    sancion_dias: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: 'control_inasistencias',
    timestamps: true,
  },
);
