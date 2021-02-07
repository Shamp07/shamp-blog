import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../../../database/Database';
import logger from '../../../../config/log.config';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
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
    a.title,
    a."commentCnt"
  FROM (
    SELECT
      ROW_NUMBER() OVER (ORDER BY p.crt_dttm) AS rownum,
      p.id,
      p.title,
      (SELECT COUNT(*) FROM post_like WHERE post_id = p.id) AS "likeCnt",
      (SELECT COUNT(*) FROM comment WHERE post_id = p.id AND delete_fl = false) AS "commentCnt"
    FROM post p
  ) a
  WHERE
    a.rownum <= 5
    AND a."likeCnt" > 0
`;

export default handler;
