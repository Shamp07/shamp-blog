import { Client } from 'pg';
import { NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';
import cors from '../../../middleware/cors';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'PUT') {
    await modifySocketId(request, response);
  }
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
          code: 1,
          message: '😀 게시글 좋아요 감사합니다!',
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, PUT /api/post/like] 유저 socket id 수정');
  });
};

const UPDATE_USER_SOCKET_ID = `
  UPDATE "user"
  SET socket_id = $1
  WHERE id = $2
`;

export default authMiddleware(handler, 0);
