import { Pool } from 'pg';
import config from './db.config.json';

const pool = new Pool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
});

export default pool;
