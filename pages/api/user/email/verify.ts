import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';

import Database from '@database/Database';
import cors from '@middleware/cors';
import * as T from '@types';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.POST) {
    await verifyUser(request, response);
  }
};

const verifyUser = async (request: NextApiRequest, response: NextApiResponse) => {
  const { email, code } = request.body;
  const values = [email];

  await Database.execute(
    (database: Client) => database.query(
      SELECT_USER_VERIFY_CODE,
      values,
    )
      .then((result) => {
        if (String(result.rows[0].verifyCode) !== code) {
          return Promise.reject();
        }

        return database.query(
          UPDATE_USER_VERIFY,
          values,
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
  );
};

const SELECT_USER_VERIFY_CODE = `
  SELECT 
    verify_code AS "verifyCode"
  FROM "user"
  WHERE email = $1
`;

const UPDATE_USER_VERIFY = `
  UPDATE "user"
  SET verify_fl = true
  WHERE email = $1
`;

export default handler;
