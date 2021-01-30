import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    await addComment(request, response);
  } else if (request.method === 'GET') {
    await getComment(request, response);
  } else if (request.method === 'PUT') {
    await modifyComment(request, response);
  } else if (request.method === 'DELETE') {
    await deleteComment(request, response);
  }
};

const addComment = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    postId, userId, commentId, comment,
  }: Interface = request.body;
  const values: (string | string[])[] = [postId, commentId, userId, comment];

  await Database.execute(
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
    logger.info('[INSERT, POST /api/post/comment] 댓글 작성');
  });
};

const getComment = async (request: NextApiRequest, response: NextApiResponse) => {
  const { postId, commentSize }: Interface = request.query;
  const values: (string | string[])[] = [postId, commentSize];

  await Database.execute(
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
    logger.info('[SELECT, GET /api/post/comment] 댓글 조회');
  });
};

const modifyComment = async (request: NextApiRequest, response: NextApiResponse) => {
  const { commentId, comment }: Interface = request.body;
  const values: (string | string[])[] = [comment, commentId];

  await Database.execute(
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
    logger.info('[UPDATE, PUT /api/post/comment] 댓글 수정');
  });
};

const deleteComment = async (request: NextApiRequest, response: NextApiResponse) => {
  const { commentId }: Interface = request.query;
  const values: (string | string[])[] = [commentId];

  await Database.execute(
    (database: Client) => database.query(
      SELECT_COMMENT_NO_REPLY,
      values,
    )
      .then((result) => {
        if (result.rows[0].count > 0) {
          return Promise.reject();
        }

        return (database.query(
          DELETE_COMMENT,
          values,
        ));
      })
      .then(() => {
        response.json({
          success: true,
          code: 1,
          message: '😀 정상적으로 댓글이 삭제 되었어요!',
        });
      }, () => {
        response.json({
          success: true,
          code: 2,
          message: '😳 해당 댓글에 답글이 달려있어서 삭제가 불가능해요!ㅠㅜ',
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, DELETE /api/post/comment] 댓글 삭제');
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
  SELECT * FROM (
    SELECT
      ROW_NUMBER() OVER(ORDER BY c.upper_id, c.id) AS rownum,
      COUNT(*) OVER() AS total,
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
  ) a
  where a.rownum <= $2
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

const SELECT_COMMENT_NO_REPLY = `
  SELECT COUNT(*) FROM comment
  WHERE
    id != $1
    AND upper_id = $1 
    AND delete_fl = false
`;

export default handler;
