import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import config from '../config/jwt.config.json';

export interface NextApiRequestToken extends NextApiRequest {
  decodedToken: Token;
}

export interface Token {
  id: number;
  email: string;
  name: string;
  adminFl: boolean;
  verifyFl: boolean;
  iat: number;
  exp: number;
}

export enum Auth {
  USER = 'user',
  ADMIN = 'admin',
}

// type
// 0: user
// 1: admin
const authMiddleware = (
  handler: Function, type: Auth,
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
