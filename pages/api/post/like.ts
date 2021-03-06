import { Client } from 'pg';
import { NextApiResponse } from 'next';

import Database from '@database/Database';
import authMiddleware from '@middleware/auth';
import cors from '@middleware/cors';
import logger from '@config/log.config';
import * as T from '@types';

const handler = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.POST) {
    await addLike(request, response);
  }
};

const addLike = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  const { postId } = request.body;
  const { id } = request.decodedToken;
  const values = [postId, id];

  await Database.execute(
    (database: Client) => database.query(
      SELECT_POST_LIKE,
      values,
    )
      .then((result) => {
        if (result.rows[0].count === 1) {
          return Promise.reject();
        }

        return database.query(
          INSERT_POST_LIKE,
          values,
        );
      })
      .then(() => {
        response.json({
          success: true,
          code: 1,
          message: '😀 게시글 좋아요 감사합니다!',
        });
      }, () => {
        response.json({
          success: true,
          code: 2,
          message: '😳 이미 좋아요를 눌러주셨어요ㅠㅜ',
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/post/like] 게시글 좋아요');
  });
};

const INSERT_POST_LIKE = `
  INSERT INTO post_like (
    post_id,
    user_id
  ) VALUES (
    $1,
    $2
  )
`;

const SELECT_POST_LIKE = `
  SELECT COUNT(*) FROM post_like
  WHERE
    post_id = $1
    AND user_id = $2
`;

export default authMiddleware(handler, T.Auth.USER);
