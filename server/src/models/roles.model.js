import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { PermisoModel } from './permisos.model.js';

export const RolModel = sequelize.define(
  'Roles',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_rol: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    tableName: 'roles',
    timestamps: true,
  },
);

export const RolPermisoModel = sequelize.define(
  'RolPermiso',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    permiso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permisos',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  },
  {
    tableName: 'roles_permisos',
    timestamps: true,
  },
);

RolModel.belongsToMany(PermisoModel, {
  through: RolPermisoModel,
  as: 'permisos',
  foreignKey: 'rol_id',
  otherKey: 'permiso_id',
});
PermisoModel.belongsToMany(RolModel, {
  through: RolPermisoModel,
  foreignKey: 'permiso_id',
  otherKey: 'rol_id',
});
