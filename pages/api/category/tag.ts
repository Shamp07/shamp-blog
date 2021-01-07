import client from '../../../database/db-connection';

const handler = (request: any, response: any) => {
  if (request.method === 'POST') {
    const { category } = request.query;

    const values: Array<string> = [category];
    client.connect();
    client.query(SELECT_CATEGORY_TAGS, values, (err: any, res: any) => {
      if (err) console.log(err);
      client.end();
      response.json({
        success: true,
        result: res.rows,
      });
    });
  }
};

const SELECT_CATEGORY_TAGS = `
  SELECT DISTINCT tags FROM post
  WHERE category = $1
`;

export default handler;
