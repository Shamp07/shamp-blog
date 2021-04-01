import { Client } from 'pg';
import { NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import cors from '../../../middleware/cors';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'GET') {
    await getAlert(request, response);
  } else if (request.method === 'PUT') {
    await readAlert(request, response);
  }
};

const getAlert = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { size } = request.query;
  const { id } = request.decodedToken;
  const queryParam = [id, size];

  await Database.execute(
    (database: Client) => database.query(
      SELECT_ALERT,
      queryParam,
    )
      .then((result) => {
        const { rows } = result;
        response.json({
          success: true,
          result: rows,
        });
      }),
  ).then(() => {
    logger.info('[SELECT, GET /api/user/alert] 유저 알림 조회');
  });
};

const readAlert = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { id } = request.body;
  const { id: userId } = request.decodedToken;
  const queryParam = [id, userId];

  await Database.execute(
    (database: Client) => database.query(
      UPDATE_ALERT_READ,
      queryParam,
    )
      .then(() => {
        response.json({
          success: true,
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, PUT /api/user/alert] 유저 알림 읽기');
  });
};

const SELECT_ALERT = `
  SELECT * FROM (
    SELECT
        ROW_NUMBER() OVER(ORDER BY crt_dttm DESC) AS rownum,
        COUNT(*) OVER() AS total,
        id,
        (SELECT content FROM comment WHERE id = a.comment_id),
        (SELECT post_id FROM comment WHERE id = a.comment_id) AS "postId",
        read_fl AS "readFl",
        CASE WHEN (CAST(TO_CHAR(NOW() - a.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
            THEN (CAST(TO_CHAR(NOW() - a.crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
          WHEN (CAST(TO_CHAR(NOW() - a.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
            THEN (CAST(TO_CHAR(NOW() - a.crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
          WHEN (CAST(TO_CHAR(NOW() - a.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
            THEN (CAST(TO_CHAR(NOW() - a.crt_dttm, 'HH24') AS INTEGER)) || ' 시간 전'
          ELSE TO_CHAR(a.crt_dttm, 'YYYY-MM-DD')
        END AS time
      FROM alert a
      WHERE a.user_id = $1
      ORDER BY crt_dttm DESC
  ) b
  WHERE b.rownum <= $2
`;

const UPDATE_ALERT_READ = `
  UPDATE alert
  SET read_fl = true
  WHERE 
    id = $1
    AND user_id = $2 
`;

export default authMiddleware(handler, 0);
