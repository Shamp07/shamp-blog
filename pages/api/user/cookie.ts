import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import config from '../../../config/jwt.config.json';

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'GET') {
    if (!('token' in request.cookies)) {
      response.status(200).json({ success: false });
      return;
    }

    let decoded;
    const { token } = request.cookies;
    if (token) {
      try {
        decoded = jwt.verify(token, config.secret);
      } catch (e) {
        response.status(200).json({ success: false });
        return;
      }
    }

    if (decoded) {
      response.json({
        success: true,
        result: decoded,
      });
    } else {
      response.status(401).json({ message: 'Unable to auth' });
    }
  }
};

export default handler;
