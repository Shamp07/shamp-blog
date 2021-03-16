import { Client } from 'pg';
import { NextApiResponse } from 'next';
import crypto from 'crypto';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import cors from '../../../middleware/cors';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'PUT') {
    const { id } = request.decodedToken;
    const { currentPassword, changePassword }: Interface = request.body;
    const values: (number | string | string[])[] = [id];

    await Database.execute(
      (database: Client) => database.query(
        SELECT_USER_SALT,
        values,
      )
        .then((result) => {
          if (result.rows.length < 1) {
            return Promise.reject();
          }

          const { salt } = result.rows[0];
          const hashPassword = crypto.createHash('sha512').update(currentPassword + salt).digest('hex');
          const values2: (number | string | string[])[] = [id, hashPassword];

          return database.query(
            SELECT_USER_PASSWORD,
            values2,
          );
        })
        .then((result) => {
          if (result.rows[0].count <= 0) {
            return Promise.reject();
          }

          const salt = String(Math.round((new Date().valueOf() * Math.random())));
          const hashPassword = crypto.createHash('sha512').update(changePassword + salt).digest('hex');
          const values3: (number | string | string[])[] = [hashPassword, id];

          return database.query(
            UPDATE_USER_PASSWORD,
            values3,
          );
        }, () => {
          response.json({
            success: true,
            message: '유저 정보가 올바르지 않습니다.',
            code: 1,
          });
        })
        .then(() => {
          response.json({
            success: true,
            message: '비밀번호가 성공적으로 변경되었습니다!',
          });
        }, () => {
          response.json({
            success: true,
            message: '현재 비밀번호가 올바르지 않습니다.',
            code: 2,
          });
        }),
    ).then(() => {
      logger.info('[UPDATE, PUT /api/user/password] 비밀번호 변경');
    });
  }
};

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
  SET password = $1
  WHERE id = $2
`;

export default authMiddleware(handler, 0);
