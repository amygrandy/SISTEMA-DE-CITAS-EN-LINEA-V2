import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { ConsultorioModel } from './consultorio.model.js';

export const TipoConsultorioModel = sequelize.define(
  'TipoConsultorio',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_tipo: { type: DataTypes.STRING, allowNull: false, unique: true },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: 'tipos_consultorio',
    timestamps: true,
  },
);
