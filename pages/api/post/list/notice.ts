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
        SELECT_POST_LIST_NOTICE,
      )
        .then((result) => {
          response.json({
            success: true,
            result: result.rows,
          });
        }),
    ).then(() => {
      logger.info('[SELECT, GET /api/post/list] 공지사항 게시글 조회');
    });
  }
};

const SELECT_POST_LIST_NOTICE = `
  SELECT 
    a.id,
    a.title,
    a."commentCnt"
  FROM (
    SELECT
      ROW_NUMBER() OVER (ORDER BY p.crt_dttm) AS rownum,
      p.id,
      p.title,
      (SELECT COUNT(*) FROM comment WHERE post_id = p.id AND delete_fl = false) AS "commentCnt"
    FROM post p
    WHERE p.category = 'notice'
  ) a
  WHERE a.rownum <= 5
`;

export default handler;
