import { Client } from 'pg';
import config from './db.config.json';

class Database {
  connection: Client;

  constructor() {
    this.connection = new Client(config);
    this.connection.connect();
  }

  query(sql: string, args: Array<any>) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, result) => {
        console.log(err);
        console.log(result);
        if (err) {
          console.log(err);
          // 트랜잭션 중 에러가 났을때 처리.
          console.log(err.message);

          // Database 에서 보여주는 에러 메시지
          // if (err.sqlMessage) {
          //   // error(err.sqlMessage);
          // }
          //
          // // 실행된 sql
          // if (err.sql) {
          //   console.log(err.sql);
          // }

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
