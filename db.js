const { Pool } = require('pg')
// Realizar la conexión con PostgreSQL con la clase Client.
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'estudiantes_dd',
  password: '12616027',
  port: 5432,
  max: 20,
  min: 2,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
}
const pool = new Pool(config)
module.exports = pool
