import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import { marked } from 'marked';

import Database from '@database/Database';
import authMiddleware from '@middleware/auth';
import cors from '@middleware/cors';
import logger from '@config/log.config';
import * as T from '@types';
import { renderPlain, getImagePath } from '@utilities/marked';
import titleURLParser from '@utilities/parser';

const handler = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.POST) {
    await authMiddleware(addPost, T.Auth.ADMIN)(request, response);
  } else if (request.method === T.RequestMethod.GET) {
    await getPost(request, response);
  } else if (request.method === T.RequestMethod.PUT) {
    await authMiddleware(modifyPost, T.Auth.ADMIN)(request, response);
  } else if (request.method === T.RequestMethod.DELETE) {
    await authMiddleware(deletePost, T.Auth.ADMIN)(request, response);
  }
};

const addPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const { title, tags, content } = request.body;

  const values = [titleURLParser(title), tags, title, content, marked(content, {
    renderer: renderPlain(),
  }).substring(0, 500), getImagePath(content)];

  await Database.execute(
    (database: Client) => database.query(
      INSERT_POST,
      values,
    )
      .then(() => {
        response.status(200).json({
          success: true,
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/post] 게시글 작성');
  });
};

const getPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const values = [id];

  let post: object;

  await Database.execute(
    (database: Client) => database.query(
      SELECT_POST,
      values,
    )
      .then((result) => {
        [post] = result.rows;
        return database.query(
          UPDATE_POST_VIEW_CNT,
          values,
        );
      })
      .then(() => {
        response.json({
          success: true,
          result: post,
        });
      }),
  ).then(() => {
    logger.info('[SELECT, GET /api/post] 게시글 조회');
  });
};

const modifyPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    id, tags, title, content,
  } = request.body;
  const values = [tags, title, content, id, marked(content, {
    renderer: renderPlain(),
  }).substring(0, 500), getImagePath(content)];

  await Database.execute(
    (database: Client) => database.query(
      UPDATE_POST,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 글이 수정 되었어요!',
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, PUT /api/post] 게시글 수정');
  });
};

const deletePost = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const values = [id];

  await Database.execute(
    (database: Client) => database.query(
      DELETE_POST,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 글이 삭제 되었어요!',
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, PUT /api/post] 게시글 삭제');
  });
};

const INSERT_POST = `
  INSERT INTO POST (
    id,
    tags,
    title,
    content,
    short_content,
    thumbnail
  ) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
  );
`;

const SELECT_POST = `
  SELECT
    p.id,
    p.tags,
    p.title,
    p.content,
    p.short_content AS "shortContent",
    p.thumbnail,
    p.view_cnt AS "viewCnt",
    (SELECT COUNT(*) FROM post_like WHERE post_id = p.id) AS "likeCnt",
    (SELECT COUNT(*) FROM comment WHERE post_id = p.id AND delete_fl = false) AS "commentCnt",
    CASE WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN '방금 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'MI') AS INTEGER)) || '분 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'HH24') AS INTEGER)) || '시간 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'DD') AS INTEGER)) || '일 전'
      ELSE TO_CHAR(p.crt_dttm, 'YYYY년 MM월 DD일')
    END AS time,
    CASE WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN '방금 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'MI') AS INTEGER)) || '분 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'HH24') AS INTEGER)) || '시간 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'DD') AS INTEGER)) || '일 전 수정'
      ELSE TO_CHAR(p.mfy_dttm, 'YYYY년 MM월 DD일')
    END AS "modifiedTime"
  FROM post p
  WHERE p.id = $1
`;

const UPDATE_POST_VIEW_CNT = `
  UPDATE post
  SET view_cnt = view_cnt + 1
  WHERE id = $1
`;

const UPDATE_POST = `
  UPDATE post
  SET
    tags = $1,
    title = $2,
    content = $3,
    short_content = $5,
    thumbnail = $6,
    mfy_dttm = NOW()
  WHERE id = $4
`;

const DELETE_POST = `
  UPDATE post
  SET
    delete_fl = true
  WHERE id = $1
`;

export default handler;
