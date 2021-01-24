import { Client } from 'pg';
import Database from '../../../database/Database';

const handler = (request: any, response: any) => {
  if (request.method === 'POST') {
    addPost(request, response);
  } else if (request.method === 'GET') {
    getPost(request, response);
  } else if (request.method === 'PUT') {
    modifyPost(request, response);
  } else if (request.method === 'DELETE') {
    deletePost(request, response);
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
          message: '😀 정상적으로 글이 등록 되었어요!',
        });
      }),
  ).then(() => {
    console.log('[INSERT, POST /api/post] 게시글 작성');
  });
};

const getPost = (request: any, response: any) => {
  const { id } = request.query;
  const values: Array<string> = [id];

  let post: object;

  Database.execute(
    (database: Client) => database.query(
      SELECT_POST,
      values,
    )
      .then((result: { rows: Array<object> }) => {
        [post] = result.rows;
        return database.query(
          UPDATE_POST_VIEW_CNT,
          values,
        );
      })
      .then(() => {
        response.json({
          success: true,
          result: post,
        });
      }),
  ).then(() => {
    console.log('[SELECT, GET /api/post] 게시글 조회');
  });
};

const modifyPost = (request: any, response: any) => {
  const {
    id,
    category, tags, title, content,
  } = request.body;
  const values: Array<string> = [category, tags, title, content, id];

  Database.execute(
    (database: Client) => database.query(
      UPDATE_POST,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀  정상적으로 글이 수정 되었어요!',
        });
      }),
  ).then(() => {
    console.log('[UPDATE, PUT /api/post] 게시글 수정');
  });
};

const deletePost = (request: any, response: any) => {
  const { id } = request.query;
  const values: Array<string> = [id];

  Database.execute(
    (database: Client) => database.query(
      DELETE_POST,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 글이 삭제 되었어요!',
        });
      }),
  ).then(() => {
    console.log('[UPDATE, PUT /api/post] 게시글 삭제');
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
    p.id,
    p.category,
    p.tags,
    p.title,
    p.content,
    p.view_cnt AS "viewCnt",
    (SELECT COUNT(*) FROM post_like WHERE post_id = p.id) AS "likeCnt",
    (SELECT COUNT(*) FROM comment WHERE post_id = p.id AND delete_fl = false) AS "commentCnt",
    CASE WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'HH24') AS INTEGER)) || ' 시간 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'DD') AS INTEGER)) || ' 일 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'MM') AS INTEGER)) || ' 달 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'YYYY') AS INTEGER)) || ' 년 전'
    END AS time,
    CASE WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'SS') AS INTEGER)) || ' 초 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'MI') AS INTEGER)) || ' 분 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'HH24') AS INTEGER)) || ' 시간 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'DD') AS INTEGER)) || ' 일 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'MM') AS INTEGER)) || ' 달 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'YYYY') AS INTEGER)) || ' 년 전 수정'
    END AS "modifiedTime"
  FROM post p
  WHERE p.id = $1
`;

const UPDATE_POST_VIEW_CNT = `
  UPDATE post
  SET view_cnt = view_cnt + 1
  WHERE id = $1
`;

const UPDATE_POST = `
  UPDATE post
  SET
    category = $1,
    tags = $2,
    title = $3,
    content = $4,
    mfy_dttm = NOW()
  WHERE id = $5
`;

const DELETE_POST = `
  UPDATE post
  SET
    delete_fl = true
  WHERE id = $1
`;

export default handler;
