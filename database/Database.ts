import { Client } from 'pg';
import config from '../config/db.config.json';
import logger from '../config/log.config';

class Database {
  connection: Client;

  constructor() {
    this.connection = new Client(config);
    this.connection.connect();
  }

  query(sql: string, args: Array<any>) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, result) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        resolve(result);
      });
    });
  }

  execute(callback: Function) {
    return callback(this).then(
      (result: any) => result,
      (err: any) => { throw err; },
    );
  }
}

export default new Database();
