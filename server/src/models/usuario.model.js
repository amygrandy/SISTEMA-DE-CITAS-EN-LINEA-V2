import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { RolModel } from './roles.model.js';

export const UsuarioModel = sequelize.define(
  'Usuario',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    contrasenia: { type: DataTypes.STRING, allowNull: false },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: 'usuarios',
    timestamps: true,
  },
);

RolModel.hasMany(UsuarioModel, {
  as: 'usuarios',
  foreignKey: 'rol_id',
});
UsuarioModel.belongsTo(RolModel, {
  as: 'rolUsuario',
  foreignKey: 'rol_id',
});
