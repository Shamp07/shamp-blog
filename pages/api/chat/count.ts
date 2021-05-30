import { Client } from 'pg';
import { NextApiResponse } from 'next';

import Database from '@database/Database';
import cors from '@middleware/cors';
import authMiddleware, { NextApiRequestToken } from '@middleware/auth';
import logger from '@config/log.config';
import * as T from '@types';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === 'GET') {
    await getChatCount(request, response);
  }
};

const getChatCount = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { isNotRead } = request.query;
  const { id } = request.decodedToken;
  const values = [id, isNotRead];

  await Database.execute(
    (database: Client) => database.query(
      SELECT_CHAT_COUNT,
      values,
    )
      .then((result) => {
        response.json({
          success: true,
          result: result.rows[0].count,
        });
      }),
  ).then(() => {
    logger.info('[SELECT, GET /api/chat/count] 채팅 개수 조회');
  });
};

const SELECT_CHAT_COUNT = `
  SELECT
    COUNT(*)
  FROM chat
  WHERE 
    to_user_id = $1
    AND (
      ($2 = true AND read_fl = false)
      OR ($2 = false)  
    )
`;

export default authMiddleware(handler, T.Auth.USER);
