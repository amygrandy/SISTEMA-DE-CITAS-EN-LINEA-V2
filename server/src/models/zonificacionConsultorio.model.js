import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { ConsultorioModel } from './consultorio.model.js';

export const ZodificacionConsultorioModel = sequelize.define(
  'ZonificacionConsultorio',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    consultorio_cabecera_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'consultorios',
        key: 'idCuaderno',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    consultorio_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'consultorios',
        key: 'idCuaderno',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'zonificacion_consultorios',
    timestamps: true,
  },
);

ConsultorioModel.hasMany(ZodificacionConsultorioModel, {
  foreignKey: 'consultorio_cabecera_id',
  as: 'consultoriosZonificados',
});
ZodificacionConsultorioModel.belongsTo(ConsultorioModel, {
  foreignKey: 'consultorio_cabecera_id',
  as: 'consultorioCabecera',
});

// Consultorio que fue asignado a una zona
ConsultorioModel.hasOne(ZodificacionConsultorioModel, {
  foreignKey: 'consultorio_asignado_id',
  as: 'zonificacion',
});
ZodificacionConsultorioModel.belongsTo(ConsultorioModel, {
  foreignKey: 'consultorio_asignado_id',
  as: 'consultorioAsignado',
});
