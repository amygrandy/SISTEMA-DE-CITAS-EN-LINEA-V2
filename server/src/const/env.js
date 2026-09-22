export const DEFAULTS = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  db_sql_server: {
    user: process.env.DB_USER_SQL_SERVER ?? 'sa',
    password: process.env.DB_PASSWORD_SQL_SERVER ?? 'desarrollo_123',
    server: process.env.DB_SERVER_SQL_SERVER ?? '172.21.96.14',
    database: process.env.DB_DATABASE_SQL_SERVER ?? 'bdhistoriasclinicas',
    port: Number(process.env.DB_PORT_SQL_SERVER || 1433),
    instanceName: process.env.BD_INSTANCE_NAME || 'SIAIS',
  },
};
