import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import Database from '@database/Database';
import cors from '@middleware/cors';
import config from '@config/jwt.config.json';
import logger from '@config/log.config';
import * as T from '@types';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === T.RequestMethod.POST) {
    const { email, password } = request.body;
    const values = [email];

    await Database.execute(
      (database: Client) => database.query(
        SELECT_USER_SALT,
        values,
      )
        .then((result) => {
          if (!result.rows.length || result.rows[0].deleteFl || result.rows[0].verifyFl) {
            return Promise.reject();
          }

          const { salt } = result.rows[0];
          const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');
          const values2 = [email, hashPassword];

          return database.query(
            SELECT_USER,
            values2,
          );
        })
        .then((result) => response.json({
          success: true,
          code: 1,
          result: jwt.sign(
            result.rows[0],
            config.secret,
            {
              expiresIn: 30000,
            },
          ),
        }), () => {
          response.status(400).json({
            success: true,
            code: 2,
          });
        }),
    ).then(() => {
      logger.info('[SELECT, GET /api/user/login] 로그인');
    });
  }
};

const SELECT_USER = `
  SELECT
    id,
    name,
    email,
    admin_fl AS "adminFl",
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
