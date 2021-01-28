import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../../database/Database';

const handler = (request: NextApiRequest, response: NextApiResponse) => {
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
  SELECT DISTINCT a.tags FROM (
    SELECT
      tags,
      (SELECT COUNT(*) FROM post_like WHERE post_id = p.id) AS like_cnt
    FROM post p
    WHERE (($1 IN ('all', 'best')) OR (p.category = $1))
    AND p.delete_fl = false
  ) a
  WHERE ((a.like_cnt > 0) OR ($1 != 'best'))
`;

export default handler;
