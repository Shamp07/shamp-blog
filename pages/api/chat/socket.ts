import { Client } from 'pg';
import { NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';
import cors from '../../../middleware/cors';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === 'GET') {
    await getSocketId(request, response);
  } else if (request.method === 'PUT') {
    await modifySocketId(request, response);
  }
};

const getSocketId = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { userId } = request.query;
  const values = [userId];
  await Database.execute(
    (database: Client) => database.query(
      SELECT_USER_SOCKET_ID,
      values,
    )
      .then((result) => {
        response.json({
          success: true,
          result: result.rows[0].socketId,
        });
      }),
  ).then(() => {
    logger.info('[SELECT, GET /api/chat/socket] 유저 socket id 조회');
  });
};

const modifySocketId = async (request: NextApiRequestToken, response: NextApiResponse) => {
  const { socketId } = request.body;
  const { id } = request.decodedToken;
  const values = [socketId, id];

  await Database.execute(
    (database: Client) => database.query(
      UPDATE_USER_SOCKET_ID,
      values,
    )
      .then(() => {
        response.json({
          success: true,
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, PUT /api/chat/socket] 유저 socket id 수정');
  });
};

const SELECT_USER_SOCKET_ID = `
  SELECT
    socket_id AS "socketId" 
  FROM "user"
  WHERE id = $1
`;

const UPDATE_USER_SOCKET_ID = `
  UPDATE "user"
  SET socket_id = $1
  WHERE id = $2
`;

export default authMiddleware(handler, 0);
