import client from '../../database/db-connection';

export default function handler(request: any, response: any) {
  client.connect();
  client.query('SELECT * FROM test', (err, res) => {
    client.end();
    response.send(res.rows);
  });
}
