import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

export const cupoFichaModel = sequelize.define(
  'CupoFichas',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    cuaderno_id: { type: DataTypes.INTEGER, allowNull: false },
    establecimiento_id: { type: DataTypes.INTEGER, allowNull: false },
    limite: { type: DataTypes.INTEGER, allowNull: false },
    reservas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'cupos_fichas',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['fecha', 'cuaderno_id', 'establecimiento_id'],
      },
    ],
  },
);
