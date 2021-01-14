import { Client } from 'pg';
import Database from '../../../database/Database';

const handler = (request: any, response: any) => {
  if (request.method === 'POST') {
    addPost(request, response);
  } else if (request.method === 'GET') {
    getPost(request, response);
  }
};

const addPost = (request: any, response: any) => {
  const {
    category, tags, title, content,
  } = request.body;

  const values: Array<string> = [category, tags, title, content];

  Database.execute(
    (database: Client) => database.query(
      INSERT_POST,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 글이 업로드 되었어요!',
        });
      }),
  ).then(() => {
    console.log('[INSERT, POST /api/post] 게시글 작성');
  });
};

const getPost = (request: any, response: any) => {
  const { id } = request.query;

  const values: Array<string> = [id];

  Database.execute(
    (database: Client) => database.query(
      SELECT_POST,
      values,
    )
      .then((result: { rows: Array<object> }) => {
        response.json({
          success: true,
          result: result.rows[0],
        });
      }),
  ).then(() => {
    console.log('[SELECT, GET /api/post] 게시글 조회');
  });
};

const INSERT_POST = `
  INSERT INTO POST (
    category,
    tags,
    title,
    content
  ) VALUES (
    $1,
    $2,
    $3,
    $4
  );
`;

const SELECT_POST = `
  SELECT
    id,
    category,
    tags,
    title,
    content,
    like_cnt AS "likeCnt",
    view_cnt AS "viewCnt",
    (SELECT COUNT(*) FROM comment WHERE post_id = id) AS "commentCnt",
    CASE WHEN (CAST(TO_CHAR(NOW() - crt_dttm, 'YYYYMMDDHHMISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHHMISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHHMISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'HH') AS INTEGER)) || ' 시간 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHHMISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'DD') AS INTEGER)) || ' 일 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHHMISS') AS INTEGER) < 10000000000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'MM') AS INTEGER)) || ' 달 전'
      WHEN (CAST(TO_CHAR(NOW() - crt_dttm,'YYYYMMDDHHMISS') AS INTEGER) < 1000000000000)
        THEN (CAST(TO_CHAR(NOW() - crt_dttm, 'YYYY') AS INTEGER)) || ' 년 전'
    END AS time
  FROM post
  WHERE id = $1
`;

export default handler;
