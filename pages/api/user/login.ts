import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Database from '../../../database/Database';
import config from '../../../config/jwt.config.json';
import logger from '../../../config/log.config';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { email, password }: Interface = request.body;
    const values: (string | string[])[] = [email, password];

    await Database.execute(
      (database: Client) => database.query(
        SELECT_USER,
        values,
      )
        .then((result: { rows: Array<object>}) => {
          if (result.rows.length >= 1) {
            const token = jwt.sign(
              result.rows[0],
              config.secret,
              {
                expiresIn: 30000,
              },
            );
            response.json({
              success: true,
              message: '😀  정상적으로 로그인 되었어요!',
              result: token,
            });
          } else {
            response.json({
              success: true,
              message: '😅  ID가 존재하지 않거나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.',
            });
          }
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
    admin_fl AS "adminFl"
  FROM "user"
  WHERE
    email = $1
    AND password = $2
`;

export default handler;
