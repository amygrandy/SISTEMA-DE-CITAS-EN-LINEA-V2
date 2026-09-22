import { Sequelize } from 'sequelize';
import { DEFAULTS } from '../const/env.js';

const isProduction = DEFAULTS.nodeEnv === 'production';

export const sequelize = new Sequelize(
  DEFAULTS.db.name,
  DEFAULTS.db.user,
  DEFAULTS.db.password,
  {
    host: DEFAULTS.db.host,
    port: Number(DEFAULTS.db.port),
    dialect: 'postgres',

    logging: isProduction ? false : console.log,

    pool: {
      max: isProduction ? 20 : 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    minifyAliases: true,
  },
);
