import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../../../database/Database';
import logger from '../../../../config/log.config';
import cors from '../../../../middleware/cors';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'GET') {
    await Database.execute(
      (database: Client) => database.query(
        SELECT_POST_LIST_POPULAR,
      )
        .then((result) => {
          response.json({
            success: true,
            result: result.rows,
          });
        }),
    ).then(() => {
      logger.info('[SELECT, GET /api/post/list/popular] 인기 게시글 조회');
    });
  }
};

const SELECT_POST_LIST_POPULAR = `
  SELECT
    a.id,
    a.title
  FROM (
    SELECT
      ROW_NUMBER() OVER (ORDER BY p.crt_dttm) AS rownum,
      p.id,
      p.title,
      p.view_cnt,
      (SELECT COUNT(*) FROM post_like WHERE post_id = p.id) AS like_cnt
    FROM post p
  ) a
  WHERE
    a.rownum <= 5
    ORDER BY a.like_cnt DESC, a.view_cnt DESC
`;

export default handler;
