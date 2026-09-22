import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { EstablecimientoModel } from '../models/establecimiento.model.js';
import { TipoConsultorioModel } from '../models/tipoConsultorio.model.js';

export const ConsultorioModel = sequelize.define(
  'Consultorio',
  {
    idCuaderno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    fk_idestablecimiento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'establecimientos',
        key: 'idestablecimiento',
      },
    },
    tipo_consultorio_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tipos_consultorio',
        key: 'id',
      },
    },
    nombre_consultorio: { type: DataTypes.STRING, allowNull: false },

    limite_fichas_diarias: { type: DataTypes.INTEGER, defaultValue: 0 },

    estado: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: 'consultorios', timestamps: true },
);

EstablecimientoModel.hasMany(ConsultorioModel, {
  foreignKey: 'fk_idestablecimiento',
});
ConsultorioModel.belongsTo(EstablecimientoModel, {
  as: 'establecimientoConsultorio',
  foreignKey: 'fk_idestablecimiento',
});
//
TipoConsultorioModel.hasMany(ConsultorioModel, {
  foreignKey: 'tipo_consultorio_id',
});
ConsultorioModel.belongsTo(TipoConsultorioModel, {
  as: 'tipoConsultorio',
  foreignKey: 'tipo_consultorio_id',
});
