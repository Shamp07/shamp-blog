import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../../../database/Database';
import logger from '../../../../config/log.config';
import cors from '../../../../middleware/cors';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === 'PUT') {
    await verifyUser(request, response);
  }
};

const verifyUser = async (request: NextApiRequest, response: NextApiResponse) => {
  const { email, code }: Interface = request.body;
  const values: (string | string[])[] = [email];

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
          message: '😀 회원가입이 모두 완료되었습니다! 로그인 해보세요!',
        });
      }, () => {
        response.json({
          success: true,
          code: 2,
          message: '😳 이메일로 전송된 코드와 입력하신 인증번호가 다릅니다 ㅠㅜ.',
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, PUT /api/verify/code] 이메일 코드 인증');
  });
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
