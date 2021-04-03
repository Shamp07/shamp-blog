import { Client, QueryResult } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';
import cors from '../../../middleware/cors';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'POST') {
    await authMiddleware(addComment, 0)(request, response);
  } else if (request.method === 'GET') {
    await getComment(request, response);
  } else if (request.method === 'PUT') {
    await authMiddleware(modifyComment, 0)(request, response);
  } else if (request.method === 'DELETE') {
    await authMiddleware(deleteComment, 0)(request, response);
  }
};

const addComment = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { postId, commentId, comment } = request.body;
  const { id, adminFl } = request.decodedToken;
  const values = [postId, commentId, id, comment];

  await Database.execute(
    (database: Client) => database.query(
      INSERT_COMMENT,
      values,
    )
      .then((): Promise<void | QueryResult> => {
        // Not Admin (Me)
        if (!adminFl) {
          const values2 = [0];
          return database.query(
            INSERT_ALERT,
            values2,
          );
        }

        return Promise.resolve();
      })
      .then((): Promise<void | QueryResult> => {
        // if Comment is Reply, Check Comment is Mine
        if (commentId) {
          const values3 = [commentId];
          return database.query(
            SELECT_COMMENT_IS_MINE,
            values3,
          );
        }

        return Promise.resolve();
      })
      .then((result): Promise<void | QueryResult> => {
        if (!result) {
          return Promise.resolve();
        }

        const queryResult = result as QueryResult;
        const { userId } = queryResult.rows[0];

        // Not Admin And Comment is Reply And isn't my comment reply
        if (!adminFl && commentId && userId !== id) {
          const values3 = [commentId];
          return database.query(
            INSERT_ALERT_COMMENT_USER,
            values3,
          );
        }

        return Promise.resolve();
      })
      .then(() => {
        response.status(200).json({
          success: true,
          message: '😀 정상적으로 댓글이 등록 되었어요!',
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/post/comment] 댓글 작성');
  });
};

const getComment = async (request: NextApiRequest, response: NextApiResponse) => {
  const { postId, commentSize } = request.query;
  const values = [postId, commentSize];

  await Database.execute(
    (database: Client) => database.query(
      SELECT_COMMENT,
      values,
    )
      .then((result) => {
        response.json({
          success: true,
          result: result.rows,
        });
      }),
  ).then(() => {
    logger.info('[SELECT, GET /api/post/comment] 댓글 조회');
  });
};

const modifyComment = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { commentId, comment } = request.body;
  const { id } = request.decodedToken;
  const values = [comment, commentId, id];

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

const deleteComment = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { commentId } = request.query;
  const { id } = request.decodedToken;
  const values = [commentId, id];

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
          message: '😳 해당 댓글에 답글이 달려있어서 삭제가 불가능합니다.',
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
    NEXTVAL('comment_id_seq'),
    $1,
    (SELECT CASE WHEN $2::integer IS NULL
      THEN CURRVAL('comment_id_seq')
      ELSE (SELECT UPPER_ID FROM comment WHERE id = $2::integer)
    END),
    $2,
    $3,
    $4
  )
`;

const INSERT_ALERT = `
  INSERT INTO alert (
    user_id,
    comment_id
  ) VALUES (
    $1,
    CURRVAL('comment_id_seq')
  )
`;

const SELECT_COMMENT_IS_MINE = `
  SELECT
    user_id AS "userId"
   FROM comment
  WHERE id = $1
`;

const INSERT_ALERT_COMMENT_USER = `
  INSERT INTO alert (
    user_id,
    comment_id
  ) VALUES (
    (SELECT USER_ID FROM comment WHERE id = $1),
    $1
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
      ELSE TO_CHAR(c.crt_dttm, 'YYYY-MM-DD')
      END AS time,
      CASE WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'SS') AS INTEGER)) || ' 초 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'MI') AS INTEGER)) || ' 분 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - c.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - c.mfy_dttm, 'HH24') AS INTEGER)) || ' 시간 전 수정'
      ELSE TO_CHAR(c.mfy_dttm, 'YYYY-MM-DD')
      END AS "modifiedTime"
    FROM comment c
    WHERE
      c.post_id = $1
      AND c.delete_fl = false
    ORDER BY c.upper_id, c.id
  ) a
  WHERE a.rownum <= $2
`;

const UPDATE_COMMENT = `
  UPDATE comment
  SET
    content = $1,
    mfy_dttm = NOW()
  WHERE
    id = $2
    AND user_id = $3
`;

const DELETE_COMMENT = `
  UPDATE comment
  SET delete_fl = true
  WHERE 
    id = $1
    AND user_id = $2
`;

const SELECT_COMMENT_NO_REPLY = `
  SELECT COUNT(*) FROM comment
  WHERE
    id != $1
    AND upper_id = $1
    AND user_id = $2 
    AND delete_fl = false
`;

export default handler;
