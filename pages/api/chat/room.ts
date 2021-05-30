import { Client } from 'pg';
import { NextApiResponse } from 'next';

import Database from '@database/Database';
import authMiddleware, { NextApiRequestToken } from '@middleware/auth';
import cors from '@middleware/cors';
import logger from '@config/log.config';
import * as T from '@types';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.GET) {
    await getChatRoom(request, response);
  }
};

const getChatRoom = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { id } = request.decodedToken;
  const values = [id];

  await Database.execute(
    (database: Client) => database.query(
      SELECT_CHATROOM_LIST,
      values,
    )
      .then((result) => {
        response.json({
          success: true,
          result: result.rows,
        });
      }),
  ).then(() => {
    logger.info('[SELECT, GET /api/chat/room] 채팅방 조회');
  });
};

const SELECT_CHATROOM_LIST = `
  SELECT
    B.id,
    B.to_user_id AS "toUserId",
    B."fromUserName",
    B.from_user_id AS "fromUserId",
    B."toUserName",
    B.message,
    CASE WHEN B.from_user_id = $1
      THEN B.to_user_id 
      ELSE B.from_user_id
    END AS "opponentUserId",
    CAST(TO_CHAR(B.crt_dttm, 'YYYYMMDDHH24MISS') AS BIGINT) AS "timeStamp",
    CASE WHEN (CAST(TO_CHAR(NOW() - B.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
      THEN TO_CHAR(B.crt_dttm, 'hh12:mi AM')
    ELSE TO_CHAR(B.crt_dttm, 'MM/DD')
    END AS time,
    (SELECT COUNT(*) FROM (
      SELECT
        ARRAY_TO_STRING(SORT(ARRAY[from_user_id, to_user_id]), ',') AS room_id
      FROM chat
      WHERE 
        read_fl = false
        AND to_user_id = $1
    ) D WHERE D.room_id = B.room_id) AS "notReadChatCount"
  FROM (
    SELECT DISTINCT ON (1) A.* FROM (
      SELECT
        ARRAY_TO_STRING(SORT(ARRAY[c.from_user_id, c.to_user_id]), ',') AS room_id,
        *,
        (SELECT name FROM "user" WHERE id = c.from_user_id) AS "fromUserName",
        (SELECT name FROM "user" WHERE id = c.to_user_id) AS "toUserName"
      FROM chat c
      WHERE
        c.from_user_id = $1
        OR c.to_user_id = $1
    ) A
    ORDER BY 1, 2 DESC
  ) B
  ORDER BY B.crt_dttm DESC
`;

export default authMiddleware(handler, T.Auth.USER);
