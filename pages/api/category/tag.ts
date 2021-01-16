import { Client } from 'pg';
import Database from '../../../database/Database';

const handler = (request: any, response: any) => {
  if (request.method === 'GET') {
    const { category } = request.query;
    response.setHeader('Access-Control-Allow-Origin', 'localhost:3000');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    const values: Array<string> = [category];

    Database.execute(
      (database: Client) => database.query(
        SELECT_CATEGORY_TAGS,
        values,
      )
        .then((result: { rows: Array<object>}) => {
          response.json({
            success: true,
            result: result.rows,
          });
        }),
    ).then(() => {
      console.log('[SELECT, GET /api/category] 현재 카테고리의 태그 조회');
    });
  }
};

const SELECT_CATEGORY_TAGS = `
  SELECT DISTINCT tags FROM post
  WHERE category = $1
  AND delete_fl = false
`;

export default handler;
