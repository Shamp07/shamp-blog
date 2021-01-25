import { Client } from 'pg';
import Database from '../../../database/Database';

const handler = (request: any, response: any) => {
  if (request.method === 'POST') {
    addComment(request, response);
  } else if (request.method === 'GET') {
    getComment(request, response);
  } else if (request.method === 'PUT') {
    modifyComment(request, response);
  } else if (request.method === 'DELETE') {
    deleteComment(request, response);
  }
};

const addComment = (request: any, response: any) => {
  const {
    postId, userId, commentId, comment,
  } = request.body;
  const values: Array<string> = [postId, commentId, userId, comment];

  Database.execute(
    (database: Client) => database.query(
      INSERT_COMMENT,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 댓글이 등록 되었어요!',
        });
      }),
  ).then(() => {
    console.log('[INSERT, POST /api/post/comment] 댓글 작성');
  });
};

const getComment = (request: any, response: any) => {
  const { postId } = request.query;
  const values: Array<string> = [postId];

  Database.execute(
    (database: Client) => database.query(
      SELECT_COMMENT,
      values,
    )
      .then((result: { rows: Array<object> }) => {
        response.json({
          success: true,
          result: result.rows,
        });
      }),
  ).then(() => {
    console.log('[SELECT, GET /api/post/comment] 댓글 조회');
  });
};

const modifyComment = (request: any, response: any) => {
  const { commentId, comment } = request.body;
  const values: Array<string> = [comment, commentId];

  Database.execute(
    (database: Client) => database.query(
      UPDATE_COMMENT,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 댓글이 수정 되었어요!',
        });
      }),
  ).then(() => {
    console.log('[UPDATE, PUT /api/post/comment] 댓글 수정');
  });
};

const deleteComment = (request: any, response: any) => {
  const { commentId } = request.query;
  const values: Array<string> = [commentId];

  Database.execute(
    (database: Client) => database.query(
      DELETE_COMMENT,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 댓글이 삭제 되었어요!',
        });
      }),
  ).then(() => {
    console.log('[UPDATE, DELETE /api/post/comment] 댓글 삭제');
  });
};

const INSERT_COMMENT = `
  INSERT INTO comment (
    id,
    post_id,
    upper_id,
    comment_id,
    user_id,
    content
  ) VALUES (
    NEXTVAL('seq_comment'),
    $1,
    (SELECT CASE WHEN $2::integer IS NULL
      THEN CURRVAL('seq_comment')
      ELSE (SELECT UPPER_ID FROM comment WHERE id = $2::integer)
    END),
    $2,
    $3,
    $4
  )
`;

const SELECT_COMMENT = `
  SELECT
    c.id,
    c.user_id AS "userId",
    c.upper_id AS "upperId",
    c.comment_id AS "commentId",
    (SELECT NAME FROM "user" WHERE id = (SELECT user_id FROM comment WHERE id = c.comment_id)) AS "commentUserName",
    (SELECT NAME FROM "user" WHERE id = c.user_id) AS "userName",
    content,
    CASE WHEN (comment_id IS NOT NULL AND comment_id != upper_id)
      THEN true ELSE false
    END AS "isTag",
    CASE WHEN (CAST(TO_CHAR(NOW() - c.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
      THEN (CAST(TO_CHAR(NOW() - c.crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
    WHEN (CAST(TO_CHAR(NOW() - c.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
      THEN (CAST(TO_CHAR(NOW() - c.crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
    WHEN (CAST(TO_CHAR(NOW() - c.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
      THEN (CAST(TO_CHAR(NOW() - c.crt_dttm, 'HH24') AS INTEGER)) || ' 시간 전'
    WHEN (CAST(TO_CHAR(NOW() - c.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
      THEN (CAST(TO_CHAR(NOW() - c.crt_dttm, 'DD') AS INTEGER)) || ' 일 전'
    WHEN (CAST(TO_CHAR(NOW() - c.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
      THEN (CAST(TO_CHAR(NOW() - c.crt_dttm, 'MM') AS INTEGER)) || ' 달 전'
    WHEN (CAST(TO_CHAR(NOW() - c.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
      THEN (CAST(TO_CHAR(NOW() - c.crt_dttm, 'YYYY') AS INTEGER)) || ' 년 전'
    END AS time,
    CASE WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
      THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'SS') AS INTEGER)) || ' 초 전 수정'
    WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
      THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'MI') AS INTEGER)) || ' 분 전 수정' 
    WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
      THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'HH24') AS INTEGER)) || ' 시간 전 수정'
    WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
      THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'DD') AS INTEGER)) || ' 일 전 수정'
    WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
      THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'MM') AS INTEGER)) || ' 달 전 수정'
    WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
      THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'YYYY') AS INTEGER)) || ' 년 전 수정'
    END AS "modifiedTime"
  FROM comment c
  WHERE
    c.post_id = $1
    AND c.delete_fl = false
  ORDER BY c.upper_id, c.id
`;

const UPDATE_COMMENT = `
  UPDATE comment
  SET
    content = $1,
    mfy_dttm = NOW()
  WHERE id = $2
`;

const DELETE_COMMENT = `
  UPDATE comment
  SET delete_fl = true
  WHERE id = $1
`;

export default handler;