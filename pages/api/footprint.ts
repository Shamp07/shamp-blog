import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';

import Database from '@database/Database';
import authMiddleware, { NextApiRequestToken } from '@middleware/auth';
import cors from '@middleware/cors';
import logger from '@config/log.config';
import * as T from '@types';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.POST) {
    await authMiddleware(addFootprint, T.Auth.USER)(request, response);
  } else if (request.method === T.RequestMethod.GET) {
    await getFootprint(request, response);
  } else if (request.method === T.RequestMethod.PUT) {
    await authMiddleware(modifyFootprint, T.Auth.USER)(request, response);
  } else if (request.method === T.RequestMethod.DELETE) {
    await authMiddleware(deleteFootprint, T.Auth.USER)(request, response);
  }
};

const addFootprint = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { content } = request.body;
  const { id: userId } = request.decodedToken;
  const values = [userId, content];

  await Database.execute(
    (database: Client) => database.query(
      INSERT_FOOTPRINT,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 발자취가 등록 되었어요!',
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/footprint] 발자취 작성');
  });
};

const getFootprint = async (request: NextApiRequest, response: NextApiResponse) => {
  const { size } = request.query;
  const values = [size];
  await Database.execute(
    (database: Client) => database.query(
      SELECT_FOOTPRINT,
      values,
    )
      .then((result: { rows: Array<object> }) => {
        response.json({
          success: true,
          result: result.rows,
        });
      }),
  ).then(() => {
    logger.info('[SELECT, GET /api/footprint] 발자취 조회');
  });
};

const modifyFootprint = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id, content } = request.body;
  const values = [content, id];

  await Database.execute(
    (database: Client) => database.query(
      UPDATE_FOOTPRINT,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 발자취가 수정 되었어요!',
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, PUT /api/footprint] 발자취 수정');
  });
};

const deleteFootprint = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const values = [id];

  await Database.execute(
    (database: Client) => database.query(
      DELETE_FOOTPRINT,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 발자취가 삭제 되었어요!',
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, DELETE /api/post/footprint] 발자취 삭제');
  });
};

const INSERT_FOOTPRINT = `
  INSERT INTO footprint (
    user_id,
    content
  ) VALUES (
    $1,
    $2
  )
`;

const SELECT_FOOTPRINT = `
  SELECT * FROM (
    SELECT
      ROW_NUMBER() OVER(ORDER BY f.crt_dttm DESC) AS rownum,
      COUNT(*) OVER() AS total,
      f.id,
      f.user_id AS "userId",
      (SELECT NAME FROM "user" WHERE id = f.user_id) AS "userName",
      content,
      CASE WHEN (CAST(TO_CHAR(NOW() - f.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - f.crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
      WHEN (CAST(TO_CHAR(NOW() - f.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - f.crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
      WHEN (CAST(TO_CHAR(NOW() - f.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - f.crt_dttm, 'HH24') AS INTEGER)) || ' 시간 전'
      ELSE TO_CHAR(f.crt_dttm, 'YYYY-MM-DD')
      END AS time,
      CASE WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'SS') AS INTEGER)) || ' 초 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'MI') AS INTEGER)) || ' 분 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'HH24') AS INTEGER)) || ' 시간 전 수정'
      ELSE TO_CHAR(f.crt_dttm, 'YYYY-MM-DD')
      END AS "modifiedTime"
    FROM footprint f
    WHERE f.delete_fl = false
    ORDER BY crt_dttm DESC
  ) a
  WHERE a.rownum <= $1
`;

const UPDATE_FOOTPRINT = `
  UPDATE footprint
  SET
    content = $1,
    mfy_dttm = NOW()
  WHERE id = $2
`;

const DELETE_FOOTPRINT = `
  UPDATE footprint
  SET delete_fl = true
  WHERE id = $1
`;

export default handler;
