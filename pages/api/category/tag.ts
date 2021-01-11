import pool from '../../../database/db-connection';

const handler = (request: any, response: any) => {
  if (request.method === 'GET') {
    const { category } = request.query;
    response.setHeader('Access-Control-Allow-Origin', 'localhost:3000');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    const values: Array<string> = [category];

    pool.connect()
      .then((client) => {
        client.query(SELECT_CATEGORY_TAGS, values)
          .then((res) => {
            response.json({
              success: true,
              result: res.rows,
            });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err2 => {
        console.error(err2);
      });
  }
};

const SELECT_CATEGORY_TAGS = `
  SELECT DISTINCT tags FROM post
  WHERE category = $1
`;

export default handler;
