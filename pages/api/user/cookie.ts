import { NextApiResponse } from 'next';

import authMiddleware, { NextApiRequestToken } from '@middleware/auth';
import cors from '@middleware/cors';
import * as T from '@types';

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.GET) {
    const { decodedToken } = request;
    response.status(200).json({
      success: true,
      result: decodedToken,
    });
  }
};

export default authMiddleware(handler, T.Auth.USER);
