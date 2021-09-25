import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';

import config from '@config/jwt.config.json';
import * as T from '@types';

const authMiddleware = (
  handler: Function, type: T.Auth,
) => async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  if (!('token' in request.cookies)) {
    response.status(200).json({
      success: false,
      message: '로그인 해주세요.',
    });
  }

  let decodedToken: T.AuthToken | undefined;
  const { token } = request.cookies;
  if (token) {
    try {
      decodedToken = jwt.verify(token, config.secret) as T.AuthToken;
    } catch (e) {
      response.status(200).json({
        success: false,
      });
    }
  }

  if (decodedToken) {
    request.decodedToken = decodedToken;
    if (type === T.Auth.ADMIN) {
      if (decodedToken.adminFl) {
        await handler(request, response);
      } else {
        response.status(200).json({
          success: false,
          message: '권한이 없습니다.',
        });
      }
    } else {
      await handler(request, response);
    }
  }
};

export default authMiddleware;
