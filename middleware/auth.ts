import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import config from '@config/jwt.config.json';
import * as T from '@types';

export interface NextApiRequestToken extends NextApiRequest {
  decodedToken: AuthToken;
}

export interface AuthToken {
  id: number;
  email: string;
  name: string;
  adminFl: boolean;
  verifyFl: boolean;
  iat: number;
  exp: number;
}

const authMiddleware = (
  handler: Function, type: T.Auth,
) => async (request: NextApiRequestToken, response: NextApiResponse) => {
  if (!('token' in request.cookies)) {
    response.status(200).json({
      success: false,
      message: '로그인 해주세요.',
    });
  }

  let decodedToken: Token | undefined;
  const { token } = request.cookies;
  if (token) {
    try {
      decodedToken = jwt.verify(token, config.secret) as Token;
    } catch (e) {
      response.status(200).json({
        success: false,
      });
    }
  }

  if (decodedToken) {
    request.decodedToken = decodedToken;
    if (type === Auth.ADMIN) {
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
