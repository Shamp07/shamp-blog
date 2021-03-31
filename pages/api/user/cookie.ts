import { NextApiResponse } from 'next';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';
import cors from '../../../middleware/cors';

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
