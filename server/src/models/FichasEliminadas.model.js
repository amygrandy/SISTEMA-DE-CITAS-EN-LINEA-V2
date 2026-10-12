import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const FichaEliminadaModel = sequelize.define(
  'FichaEliminadas',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idfichaprogramada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_ini: { type: DataTypes.DATE, allowNull: false },
    hora_fin: { type: DataTypes.DATE },

    codigo_asegurado: { type: DataTypes.STRING, allowNull: false },
    codigo_matricula: { type: DataTypes.STRING, allowNull: false },
    //
    poblacion_id: { type: DataTypes.INTEGER, allowNull: false },
    cedula_identidad: { type: DataTypes.STRING, allowNull: false },
    nombre_completo: { type: DataTypes.STRING, allowNull: false },

    cuaderno_id: { type: DataTypes.INTEGER, allowNull: false },
    consultorio: { type: DataTypes.STRING, allowNull: false },
    personal_id: { type: DataTypes.INTEGER, allowNull: false },

    establecimiento_id: { type: DataTypes.INTEGER, allowNull: false },
    establecieminto: { type: DataTypes.STRING, allowNull: false },
    nombre_doctor: { type: DataTypes.STRING, allowNull: false },

    origen: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'fichas_eliminadas',
    timestamps: true,
  },
);
