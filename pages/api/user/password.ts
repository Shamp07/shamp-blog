import { NextApiResponse } from 'next';
import crypto from 'crypto';

import database from '@database';
import cors from '@middleware/cors';
import authMiddleware from '@middleware/auth';
import * as T from '@types';

const handler = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === T.RequestMethod.PUT) {
    await resetPassword(request, response);
  }
};

const resetPassword = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  const { id } = request.decodedToken;
  const { currentPassword, password } = request.body;

  const saltResult = await database.query(SELECT_USER_SALT, [id]);

  if (!saltResult.rows.length) {
    return response.json({
      success: true,
      code: 3,
    });
  }

  const { salt } = saltResult.rows[0];
  const hashPassword = getHashPassword(currentPassword, salt);

  const passwordResult = await database.query(SELECT_USER_PASSWORD, [id, hashPassword]);

  if (!passwordResult.rows[0].count) {
    return response.json({
      success: true,
      code: 2,
    });
  }

  const newSalt = String(Math.round((new Date().valueOf() * Math.random())));
  const newHashPassword = getHashPassword(password, newSalt);

  await database.query(UPDATE_USER_PASSWORD, [newHashPassword, newSalt, id]);

  return response.json({
    success: true,
    code: 1,
  });
};

const getHashPassword = (password: string, salt: string) => crypto.createHash('sha512').update(password + salt).digest('hex');

const SELECT_USER_SALT = `
  SELECT salt FROM "user"
  WHERE id = $1
`;

const SELECT_USER_PASSWORD = `
  SELECT count(*) FROM "user"
  WHERE id = $1
  AND password = $2
`;

const UPDATE_USER_PASSWORD = `
  UPDATE "user"
  SET
    password = $1,
    salt = $2
  WHERE id = $3
`;

export default authMiddleware(handler, T.Auth.USER);
