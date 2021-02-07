import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware, { Token } from '../../../middleware/auth';

interface NextApiRequestToken extends NextApiRequest {
  decodedToken: Token;
}

const handler = (request: NextApiRequestToken, response: NextApiResponse) => {
  if (request.method === 'GET') {
    const { decodedToken } = request;
    response.status(200).json({
      success: true,
      result: decodedToken,
    });
  }
};

export default authMiddleware(handler, 0);
