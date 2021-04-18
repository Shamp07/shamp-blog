import { Client } from 'pg';
import { NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';
import cors from '../../../middleware/cors';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === 'GET') {
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
  SELECT * FROM (
    SELECT distinct on (1) A.* FROM (
        SELECT
            array_to_string(sort(array[from_user_id, to_user_id]), ',') AS room_id,
            *
        FROM chat
        WHERE
            from_user_id = 0
            OR to_user_id = 0
    ) A
    ORDER BY 1, 2 DESC, 5
  ) B
  ORDER BY B.crt_dttm DESC
`;

export default authMiddleware(handler, 0);
