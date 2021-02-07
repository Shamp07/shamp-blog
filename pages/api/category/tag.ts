import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import cors from '../../../middleware/cors';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'GET') {
    const { category }: Interface = request.query;
    const values: (string | string[])[] = [category];

    await Database.execute(
      (database: Client) => database.query(
        SELECT_CATEGORY_TAGS,
        values,
      )
        .then((result) => {
          response.json({
            success: true,
            result: result.rows,
          });
        }),
    ).then(() => {
      logger.info('[SELECT, GET /api/category] 현재 카테고리의 태그 조회');
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
