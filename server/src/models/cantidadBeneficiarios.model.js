import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const CantidadBeneficiariosModel = sequelize.define(
  'CantidadBeneficiarios',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad_ficha_por_asgurado: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {
    tableName: 'cantidad_beneficiarios',
    timestamps: true,
  },
);
