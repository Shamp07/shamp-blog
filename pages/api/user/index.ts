import { Client } from 'pg';
import { NextApiResponse } from 'next';
import crypto from 'crypto';

import Database from '@database/Database';
import cors from '@middleware/cors';
import authMiddleware from '@middleware/auth';
import logger from '@config/log.config';
import * as T from '@types';

const handler = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === T.RequestMethod.POST) {
    await addUser(request, response);
  } else if (request.method === T.RequestMethod.DELETE) {
    await authMiddleware(deleteUser, T.Auth.USER)(request, response);
  }
};

const addUser = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  const { email, name, password } = request.body;
  const salt = String(Math.round((new Date().valueOf() * Math.random())));
  const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');

  const values = [email, name];

  await Database.execute(
    (database: Client) => database.query(
      SELECT_USER_DUPLICATE,
      values,
    )
      .then((result) => {
        if (result.rows.length) {
          return Promise.reject();
        }

        const values2 = [email, hashPassword, salt, name];
        return database.query(
          INSERT_USER,
          values2,
        );
      })
      .then(() => {
        response.json({
          success: true,
          code: 1,
        });
      }, () => {
        response.json({
          success: true,
          code: 2,
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/user] 회원가입');
  });
};

const deleteUser = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  const { email: emailText } = request.query;
  const { email, id } = request.decodedToken;

  if (email !== emailText) {
    response.json({
      success: true,
      code: 2,
    });
  } else {
    const values = [emailText, id];

    await Database.execute(
      (database: Client) => database.query(
        DELETE_USER,
        values,
      )
        .then(() => {
          response.json({
            success: true,
            code: 1,
          });
        }),
    ).then(() => {
      logger.info('[UPDATE, DELETE /api/user] 회원탈퇴');
    });
  }
};

const INSERT_USER = `
  INSERT INTO "user" (
    email,
    password,
    salt,
    name
  ) VALUES (
    $1,
    $2,
    $3,
    $4
  )
`;

const SELECT_USER_DUPLICATE = `
  SELECT 
    CASE
      WHEN ($1 = email) THEN '이메일'
      WHEN ($2 = name) THEN '이름'
    END AS duplicate,
    verify_fl AS "verifyFl"
  FROM "user"
  WHERE
    email = $1
    OR name = $2
`;

const DELETE_USER = `
  UPDATE "user"
  SET delete_fl = true
  WHERE email = $1
  AND id = $2
`;

export default handler;
