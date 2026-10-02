import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';
import { ConsultorioModel } from './consultorio.model.js';

export const diaSemanaModel = sequelize.define(
  'DiaSemana',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dia: { type: DataTypes.STRING },
    numero: { type: DataTypes.INTEGER },
  },
  {
    timestamps: true,
    tableName: 'dias_semana',
  },
);

export const consultorioDiaSemanaModel = sequelize.define(
  'ConsultoriosDiaSemana',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    consultorio_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'consultorios', key: 'idCuaderno' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    dia_semana_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'dias_semana', key: 'id' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  },
  {
    tableName: 'consultorios_dia_semana',
    timestamps: true,
  },
);

ConsultorioModel.belongsToMany(diaSemanaModel, {
  as: 'dias',
  through: consultorioDiaSemanaModel,
  foreignKey: 'consultorio_id',
  otherKey: 'dia_semana_id',
});
diaSemanaModel.belongsToMany(ConsultorioModel, {
  through: consultorioDiaSemanaModel,
  foreignKey: 'dia_semana_id',
  otherKey: 'consultorio_id',
});
