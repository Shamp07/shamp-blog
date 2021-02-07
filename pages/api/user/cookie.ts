import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware, { Token } from '../../../middleware/auth';
import cors from '../../../middleware/cors';

interface NextApiRequestToken extends NextApiRequest {
  decodedToken: Token;
}

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);
  if (request.method === 'GET') {
    const { decodedToken } = request;
    response.status(200).json({
      success: true,
      result: decodedToken,
    });
  }
};

export default authMiddleware(handler, 0);
