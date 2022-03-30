import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import database from '@database';
import cors from '@middleware/cors';
import config from '@config/jwt.config.json';
import * as T from '@types';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === T.RequestMethod.POST) {
    await login(request, response);
  }
};

const login = async (request: NextApiRequest, response: NextApiResponse) => {
  const { email, password } = request.body;

  const saltResult = await database.query(SELECT_USER_SALT, [email]);

  if (!saltResult.rows.length || saltResult.rows[0].deleteFl || !saltResult.rows[0].verifyFl) {
    return response.status(400).json({
      success: true,
      code: 2,
    });
  }

  const { salt } = saltResult.rows[0];
  const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');

  const userResult = await database.query(SELECT_USER, [email, hashPassword]);

  return response.json({
    success: true,
    code: 1,
    result: jwt.sign(
      userResult.rows[0],
      config.secret,
      {
        expiresIn: 30000,
      },
    ),
  });
};

const SELECT_USER = `
  SELECT
    id,
    name,
    email,
    admin_fl AS "adminFl"
  FROM "user"
  WHERE
    email = $1
    AND password = $2
`;

const SELECT_USER_SALT = `
  SELECT
    salt,
    verify_fl AS "verifyFl",
    delete_fl AS "deleteFl" 
  FROM "user" 
  WHERE email = $1
`;

export default handler;
