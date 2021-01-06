import client from '../../../database/db-connection';

export default function handler(request: any, response: any) {
  console.log(request.body);
  client.connect();
  client.query(selectPostList, (err: any, res: { rows: Array<object> }) => {
    client.end();
    response.send(res.rows);
  });
}

const selectPostList = `
  SELECT * FROM post
`;
