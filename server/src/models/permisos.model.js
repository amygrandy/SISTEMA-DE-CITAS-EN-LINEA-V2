import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const PermisoModel = sequelize.define(
  'Permisos',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_permiso: { type: DataTypes.STRING, allowNull: false },
    codigo_permiso: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'permisos',
    timestamps: true,
  },
);
