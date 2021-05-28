import { Client, QueryResult } from 'pg';
import config from '../config/db.config.json';
import logger from '../config/log.config';

class Database {
  connection: Client;

  constructor() {
    this.connection = new Client(config);
    this.connection.connect();
  }

  query(sql: string, args: (number | string | string[])[]) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, result) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
          logger.error(err.toString());
          reject(err);
        }
        resolve(result);
      });
    });
  }

  execute(callback: Function) {
    return callback(this).then(
      (result: QueryResult) => result,
      (err: Error) => { throw err; },
    );
  }
}

export default new Database();
