import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const EstablecimientoModel = sequelize.define(
  'Establecimiento',
  {
    idestablecimiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: 'idestablecimiento DEL SIAIS DE LA TABLA hcl_establecimiento',
    },
    nombre_establecimiento: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'establecimientos',
    timestamps: true,
  },
);
