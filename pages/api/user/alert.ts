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
        response.json({
          success: true,
          result: result.rows,
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/user] 회원가입');
  });
};

const SELECT_ALERT = `
  SELECT * FROM alert
`;

export default authMiddleware(handler, 0);
