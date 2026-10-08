import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const FichaWebModel = sequelize.define(
  'FichaWeb',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idfichaprogramada: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_ini: { type: DataTypes.DATE },
    fecha_final: { type: DataTypes.DATE },

    codigo_asegurado: { type: DataTypes.STRING },
    codigo: { type: DataTypes.STRING },

    poblacion_id: { type: DataTypes.INTEGER, allowNull: false },
    cedula_identidad: { type: DataTypes.STRING, allowNull: false },
    nombre_completo: { type: DataTypes.STRING, allowNull: false },

    cuaderno_id: { type: DataTypes.INTEGER, allowNull: false },
    consultorio: { type: DataTypes.STRING, allowNull: false },
    personal_id: { type: DataTypes.INTEGER, allowNull: false },

    establecimiento_id: { type: DataTypes.INTEGER, allowNull: false },
    establecieminto: { type: DataTypes.STRING, allowNull: false },
    nombre_doctor: { type: DataTypes.STRING },
    fechaAtencion: { type: DataTypes.STRING },
    matricula: { type: DataTypes.STRING },

    estado: { type: DataTypes.ENUM('PENDIENTE', 'CONFIRMADA') },
    asistio_a_la_cita: {
      type: DataTypes.ENUM('ASISTIO', 'FALTO', 'POR_ASISTIR'),
      defaultValue: 'POR_ASISTIR',
    },
  },
  {
    tableName: 'fichas_web',
    timestamps: true,
  },
);
