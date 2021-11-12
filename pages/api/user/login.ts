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
    let message: string;

    await Database.execute(
      (database: Client) => database.query(
        SELECT_USER_SALT,
        values,
      )
        .then((result) => {
          if (result.rows.length <= 0) {
            message = '😅 ID가 존재하지 않거나 비밀번호가 일치하지 않습니다.';
            return Promise.reject();
          }
          if (result.rows[0].deleteFl) {
            message = '😅 해당 계정을 탈퇴된 상태입니다.';
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
        .then((result) => {
          if (result.rows.length <= 0) {
            return response.status(400).json({
              success: true,
              code: 2,
              message: '😅 ID가 존재하지 않거나 비밀번호가 일치하지 않습니다.',
            });
          }

          if (!result.rows[0].verifyFl) {
            return response.json({
              success: true,
              code: 3,
            });
          }

          const token = jwt.sign(
            result.rows[0],
            config.secret,
            {
              expiresIn: 30000,
            },
          );
          return response.json({
            success: true,
            message: '😀 정상적으로 로그인 되었어요!',
            code: 1,
            result: token,
          });
        }, () => {
          response.status(400).json({
            success: true,
            code: 2,
            message,
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
    verify_fl AS "verifyFl"
  FROM "user"
  WHERE
    email = $1
    AND password = $2
`;

const SELECT_USER_SALT = `
  SELECT
    salt,
    delete_fl AS "deleteFl" 
  FROM "user" 
  WHERE email = $1
`;

export default handler;
