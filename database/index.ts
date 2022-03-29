import { Pool } from 'pg';
import config from '@config/db.config.json';

const pool = new Pool(config);

export default {
  query: async (text: string, params?: (number | string | string[])[]) => pool.query(text, params),
};
