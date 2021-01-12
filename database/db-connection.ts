import { Client } from 'pg';
import config from './db.config.json';

const client = new Client({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
});

export default client;
