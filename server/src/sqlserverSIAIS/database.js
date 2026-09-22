import sql from 'mssql';
import { DEFAULTS } from '../const/env.js';

const config = {
  user: DEFAULTS.db_sql_server.user,
  password: DEFAULTS.db_sql_server.password,
  server: DEFAULTS.db_sql_server.server,
  database: DEFAULTS.db_sql_server.database,
  port: DEFAULTS.db_sql_server.port,

  connectionTimeout: 60000,

  requestTimeout: 60000,

  options: {
    instanceName: DEFAULTS.db_sql_server.instanceName,
    encrypt: false,
    trustServerCertificate: true,
  },

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool;

async function getConnection() {
  if (!pool) {
    pool = await sql.connect(config);
  }

  return pool;
}

export { sql, getConnection };
