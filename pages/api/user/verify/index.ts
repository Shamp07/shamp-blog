import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';
import smtpTransport from '../../../../config/email.config';
import Database from '../../../../database/Database';
import logger from '../../../../config/log.config';
import cors from '../../../../middleware/cors';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'PUT') {
    const { email }: Interface = request.body;
    const code = generateRandom(111111, 999999);

    const mailOptions = {
      from: '배진영',
      to: email,
      subject: '[shamp-blog] 인증 이메일 입니다.',
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 540px; height: 600px; border-top: 4px solid #2d79c7; margin: 100px auto; padding: 30px 0; box-sizing: border-box;">
          <h1 style="margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;">
            <span style="font-size: 15px; margin: 0 0 10px 3px;">Shamp Blog</span><br />
            <span style="color: #2d79c7;">메일인증</span> 안내입니다.
          </h1>
          <p style="font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;">
            안녕하세요.<br />
            Shamp Blog 에 가입해 주셔서 진심으로 감사드립니다.<br />
            아래 <b style="color: #2d79c7;">'인증 번호'</b> 를 입력하여 회원가입을 완료해주세요.<br />
            감사합니다.
          </p>
          <a style="color: #FFF; text-decoration: none; text-align: center;" target="_blank">
            <p style="display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #2d79c7; line-height: 45px; vertical-align: middle; font-size: 25px;">
              ${code}
            </p>
          </a>
          <div style="border-top: 1px solid #DDD; padding: 5px;">
            <p style="font-size: 13px; line-height: 21px; color: #555;">
              만약 코드를 정상적으로 입력하여, 인증 실패 한다면 메일을 재전송 해주세요.<br />
            </p>
          </div>
        </div>
      `,
    };

    await smtpTransport.sendMail(mailOptions, (error) => {
      if (error) {
        response.json({
          success: false,
          message: '😀 메일 송신 중 오류가 발생하였습니다.',
        });
      }
      smtpTransport.close();
    });

    const values: (string | string[])[] = [email, code];
    await Database.execute(
      (database: Client) => database.query(
        UPDATE_USER_VERIFY_CODE,
        values,
      )
        .then(() => {
          response.json({
            success: true,
            message: '😀 입력하신 이메일로 가입 메일이 전송되었어요!<br /> 메일 URL 을 클릭하여 가입을 완료하세요!',
          });
        }),
    ).then(() => {
      logger.info('[UPDATE, PUT /api/footprint] 발자취 수정');
    });
  }
};

const generateRandom = (min: number, max: number) => (
  String(Math.floor(Math.random() * (max - min + 1)) + min)
);

const UPDATE_USER_VERIFY_CODE = `
  UPDATE "user"
  SET verify_code = $2
  WHERE email = $1
`;

export default handler;
