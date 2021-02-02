import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../database/Database';
import logger from '../../config/log.config';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    await addFootprint(request, response);
  } else if (request.method === 'GET') {
    await getFootprint(request, response);
  } else if (request.method === 'PUT') {
    await modifyFootprint(request, response);
  } else if (request.method === 'DELETE') {
    await deleteFootprint(request, response);
  }
};

const addFootprint = async (request: NextApiRequest, response: NextApiResponse) => {
  const { content, userId }: Interface = request.body;
  const values: (string | string[])[] = [content, userId];

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
  const { size }: Interface = request.query;
  const values: (string | string[])[] = [size];

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
  const { id, content }: Interface = request.body;
  const values: (string | string[])[] = [content, id];

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
  const { id }: Interface = request.query;
  const values: (string | string[])[] = [id];

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
      ROW_NUMBER() OVER(ORDER BY crt_dttm) AS rownum,
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
      WHEN (CAST(TO_CHAR(NOW() - f.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - f.crt_dttm, 'DD') AS INTEGER)) || ' 일 전'
      WHEN (CAST(TO_CHAR(NOW() - f.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
        THEN (CAST(TO_CHAR(NOW() - f.crt_dttm, 'MM') AS INTEGER)) || ' 달 전'
      WHEN (CAST(TO_CHAR(NOW() - f.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
        THEN (CAST(TO_CHAR(NOW() - f.crt_dttm, 'YYYY') AS INTEGER)) || ' 년 전'
      END AS time,
      CASE WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'SS') AS INTEGER)) || ' 초 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'MI') AS INTEGER)) || ' 분 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'HH24') AS INTEGER)) || ' 시간 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'DD') AS INTEGER)) || ' 일 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'MM') AS INTEGER)) || ' 달 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - f.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
        THEN (CAST(TO_CHAR(NOW() - f.mfy_dttm, 'YYYY') AS INTEGER)) || ' 년 전 수정'
      END AS "modifiedTime"
    FROM footprint f
    WHERE f.delete_fl = false
    ORDER BY crt_dttm
  ) a
  WHERE a.rownum <= $2
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
