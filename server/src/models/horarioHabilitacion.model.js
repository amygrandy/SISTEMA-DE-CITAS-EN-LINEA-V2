import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const HorarioHabilitacionModel = sequelize.define(
  'HorarioHabilitacion',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hora_inicio: { type: DataTypes.TIME, allowNull: false },
    hora_final: { type: DataTypes.TIME, allowNull: false },
  },
  {
    tableName: 'horario_habilitacion',
    timestamps: true,
  },
);
