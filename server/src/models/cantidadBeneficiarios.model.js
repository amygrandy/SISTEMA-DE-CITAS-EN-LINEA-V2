import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const CantidadBeneficiariosModel = sequelize.define(
  'CantidadBeneficiarios',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad_fichas: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {
    tableName: 'cantidad_beneficiarios',
    timestamps: true,
  },
);
