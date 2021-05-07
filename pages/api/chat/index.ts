import { Client } from 'pg';
import { NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';
import cors from '../../../middleware/cors';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === 'GET') {
    await getChatList(request, response);
  } else if (request.method === 'POST') {
    await sendChat(request, response);
  }
};

const getChatList = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { userId } = request.query;
  const { id } = request.decodedToken;
  const values = [id, userId];

  await Database.execute(
    (database: Client) => database.query(
      UPDATE_CHAT_LIST,
      values,
    )
      .then(() => database.query(
        SELECT_CHAT_LIST,
        values,
      ))
      .then((result) => {
        response.json({
          success: true,
          result: result.rows,
        });
      }),
  ).then(() => {
    logger.info('[SELECT, GET /api/chat] 채팅 리스트 조회');
  });
};

const sendChat = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { userId, message } = request.body;
  const { id } = request.decodedToken;
  const values = [id, userId, message];

  await Database.execute(
    (database: Client) => database.query(
      INSERT_CHAT,
      values,
    )
      .then(() => {
        response.json({
          success: true,
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/chat] 채팅 송신');
  });
};

const SELECT_CHAT_LIST = `
  SELECT
    id,
    message,
    from_user_id AS "fromUserId",
    (SELECT name FROM "user" WHERE id = from_user_id) AS "fromUserName",
    TO_CHAR(NOW() - crt_dttm, 'hh12:mi AM') AS time
  FROM chat
  WHERE
    (from_user_id = $1 AND to_user_id = $2)
    OR (from_user_id = $2 AND to_user_id = $1)
  ORDER BY crt_dttm
`;

const UPDATE_CHAT_LIST = `
  UPDATE chat
  SET
    read_fl = true
  WHERE
    to_user_id = $1 
    AND from_user_id = $2
`;

const INSERT_CHAT = `
  INSERT INTO chat (
    from_user_id,
    to_user_id,
    message
  ) VALUES (
    $1,
    $2,
    $3
  );
`;

export default authMiddleware(handler, 0);
