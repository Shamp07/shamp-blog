import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';

import Database from '@database/Database';
import cors from '@middleware/cors';
import logger from '@config/log.config';
import * as T from '@types';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === T.RequestMethod.GET) {
    const { category, tag, page } = request.query;
    const values = [category, tag, page];

    await Database.execute(
      (database: Client) => database.query(
        SELECT_POST_LIST,
        values,
      )
        .then((result) => {
          response.json({
            success: true,
            result: result.rows,
          });
        }),
    ).then(() => {
      logger.info('[SELECT, GET /api/post/list] 카테고리 게시글 조회');
    });
  }
};

const SELECT_POST_LIST = `
  SELECT * FROM (
    SELECT
      ROW_NUMBER() OVER(ORDER BY b."crtDttm" DESC) AS rownum,
      CEIL((COUNT(*) OVER() / 10.0)) AS page,
      b.*
    FROM (
      SELECT
        p.id,
        p.category,
        p.tags,
        p.title,
        p.content,
        p.crt_dttm AS "crtDttm",
        (SELECT COUNT(*) FROM post_like WHERE post_id = p.id) AS "likeCnt",
        (SELECT COUNT(*) FROM comment WHERE post_id = p.id AND delete_fl = false) AS "commentCnt",
        CASE WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
            THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
          WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
            THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
          WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
            THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'HH24') AS INTEGER)) || ' 시간 전'
          ELSE TO_CHAR(crt_dttm, 'YYYY-MM-DD')
        END AS time
      FROM post p
      WHERE
        (($1 IN ('all', 'best')) OR (category = $1))
        AND (($2 = 'best' OR $2 IS NULL) OR ($2::text IS NOT NULL AND p.tags = $2))
        AND p.delete_fl = false
      ORDER BY p.crt_dttm DESC
    ) b
    WHERE ((b."likeCnt" > 10) OR ($1 != 'best'))
    AND ((b."likeCnt" > 10) OR ($2::text IS NULL OR $2 != 'best'))
  ) a
  WHERE
    (a.rownum > ($3 - 1) * 10)
    AND (a.rownum <= ($3 * 10))
`;

export default handler;
