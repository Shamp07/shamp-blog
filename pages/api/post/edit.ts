import { NextApiRequest, NextApiResponse } from 'next';

import database from '@database';
import authMiddleware from '@middleware/auth';
import cors from '@middleware/cors';
import * as T from '@types';

const handler = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.GET) {
    getEditPost(request, response);
  }
};

const getEditPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  const { rows } = await database.query(SELECT_EDIT_POST, [id]);

  response.json({
    success: true,
    result: rows[0],
  });
};

const SELECT_EDIT_POST = `
  SELECT
    p.id,
    p.tags,
    p.title,
    p.content
  FROM post p
  WHERE p.id = $1
`;

export default authMiddleware(handler, T.Auth.ADMIN);
