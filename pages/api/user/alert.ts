import { Client } from 'pg';
import { NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import cors from '../../../middleware/cors';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'GET') {
    await getUser(request, response);
  }
};

const getUser = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { id } = request.decodedToken;
  const queryParam = [id];

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

const SELECT_ALERT = `
  SELECT
    (SELECT content FROM comment WHERE id = a.comment_id),
    (SELECT post_id FROM comment WHERE id = a.comment_id),
    read_fl,
    CASE WHEN (CAST(TO_CHAR(NOW() - a.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - a.crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
      WHEN (CAST(TO_CHAR(NOW() - a.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - a.crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
      WHEN (CAST(TO_CHAR(NOW() - a.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - a.crt_dttm, 'HH24') AS INTEGER)) || ' 시간 전'
      ELSE TO_CHAR(a.crt_dttm, 'YYYY-MM-DD')
    END AS time
  FROM alert a
  WHERE USER_ID = $1
`;

export default authMiddleware(handler, 0);
