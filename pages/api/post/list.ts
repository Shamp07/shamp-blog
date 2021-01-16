import { Client } from 'pg';
import Database from '../../../database/Database';

const handler = (request: any, response: any) => {
  if (request.method === 'GET') {
    const { category, tag } = request.query;
    const values: Array<string> = [category, tag || ''];

    Database.execute(
      (database: Client) => database.query(
        SELECT_POST_LIST,
        values,
      )
        .then((result: { rows: Array<object>}) => {
          response.json({
            success: true,
            result: result.rows,
          });
        }),
    ).then(() => {
      console.log('[SELECT, GET /api/post/list] 카테고리 게시글 조회');
    });
  }
};

const SELECT_POST_LIST = `
  SELECT
    id,
    category,
    tags,
    title,
    content,
    like_cnt AS "likeCnt",
    (SELECT COUNT(*) FROM comment WHERE post_id = id AND delete_fl = false) AS "commentCnt",
    CASE WHEN (CAST(TO_CHAR(NOW() - crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'HH24') AS INTEGER)) || ' 시간 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'DD') AS INTEGER)) || ' 일 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'MM') AS INTEGER)) || ' 달 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'YYYY') AS INTEGER)) || ' 년 전'
    END AS time
  FROM post
  WHERE
    category = $1
    AND tags LIKE '%' || $2 || '%'
    AND delete_fl = false
  ORDER BY crt_dttm DESC
`;

export default handler;
