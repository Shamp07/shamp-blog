import { NextApiRequest, NextApiResponse } from 'next';

import database from '@database';
import cors from '@middleware/cors';
import * as T from '@types';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === T.RequestMethod.GET) {
    const { rows } = await database.query(SELECT_TEMPORARY_POST_LIST);

    response.json({
      success: true,
      result: rows,
    });
  }
};

const SELECT_TEMPORARY_POST_LIST = `
  SELECT * FROM (
    SELECT
      ROW_NUMBER() OVER(ORDER BY b."crtDttm" DESC) AS rownum,
      CEIL((COUNT(*) OVER() / 10.0)) AS page,
      b.*
    FROM (
      SELECT
        p.id,
        p.tags AS tag,
        p.title,
        p.title_id AS "titleId",
        p.content,
        p.short_content AS "shortContent",
        p.thumbnail,
        p.crt_dttm AS "crtDttm",
        (SELECT COUNT(*) FROM post_like WHERE post_id = p.id) AS "likeCnt",
        (SELECT COUNT(*) FROM comment WHERE post_id = p.id AND delete_fl = false) AS "commentCnt",
        CASE WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
            THEN '방금 전 sdsa'
          WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
            THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'MI') AS INTEGER)) || '분 전'
          WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
            THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'HH24') AS INTEGER)) || '시간 전'
          WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
            THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'DD') AS INTEGER)) || '일 전'
          ELSE TO_CHAR(crt_dttm, 'YYYY년 MM월 DD일')
        END AS time,
        CASE WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
            THEN '방금 전 수정'
          WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
            THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'MI') AS INTEGER)) || '분 전 수정'
          WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
            THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'HH24') AS INTEGER)) || '시간 전 수정'
          WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
            THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'DD') AS INTEGER)) || '일 전 수정'
          ELSE TO_CHAR(p.mfy_dttm, 'YYYY년 MM월 DD일')
        END AS "modifiedTime"
      FROM post p
      WHERE 
        p.delete_fl = false
        AND p.temporary_fl = true
      ORDER BY p.crt_dttm DESC
    ) b
  ) a
`;

export default handler;
