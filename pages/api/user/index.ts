import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    await addUser(request, response);
  }
};

const addUser = async (request: NextApiRequest, response: NextApiResponse) => {
  const { email, name, password }: Interface = request.body;
  const salt = String(Math.round((new Date().valueOf() * Math.random())));
  const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');

  const values: (string | string[])[] = [email, name];

  let message: string;

  await Database.execute(
    (database: Client) => database.query(
      SELECT_USER_DUPLICATE,
      values,
    )
      .then((result) => {
        if (result.rows.length) {
          message = `😳 동일한 ${result.rows[0].duplicate}를 사용하는 유저가 이미 있습니다 ㅠㅜ.`;
          return Promise.reject();
        }

        const values2: (string | string[])[] = [email, hashPassword, salt, name];
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
          message,
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/user] 회원가입');
  });
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
    END AS duplicate
  FROM "user"
  WHERE
    email = $1
    OR name = $2
`;

export default handler;
