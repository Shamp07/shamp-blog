import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../../database/Database';
import logger from '../../../config/log.config';
import authMiddleware, { NextApiRequestToken } from '../../../middleware/auth';

interface Interface {
  [key: string]: string | string[];
}

const handler = async (request: NextApiRequestToken, response: NextApiResponse) => {
  if (request.method === 'POST') {
    await authMiddleware(addPost, 1)(request, response);
  } else if (request.method === 'GET') {
    await getPost(request, response);
  } else if (request.method === 'PUT') {
    await authMiddleware(modifyPost, 1)(request, response);
  } else if (request.method === 'DELETE') {
    await authMiddleware(deletePost, 1)(request, response);
  }
};

const addPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    category, tags, title, content,
  }: Interface = request.body;
  const values: (string | string[])[] = [category, tags, title, content];

  await Database.execute(
    (database: Client) => database.query(
      INSERT_POST,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀 정상적으로 글이 등록 되었어요!',
        });
      }),
  ).then(() => {
    logger.info('[INSERT, POST /api/post] 게시글 작성');
  });
};

const getPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id }: Interface = request.query;
  const values: (string | string[])[] = [id];

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
    id,
    category, tags, title, content,
  }: Interface = request.body;
  const values: (string | string[])[] = [category, tags, title, content, id];

  await Database.execute(
    (database: Client) => database.query(
      UPDATE_POST,
      values,
    )
      .then(() => {
        response.json({
          success: true,
          message: '😀  정상적으로 글이 수정 되었어요!',
        });
      }),
  ).then(() => {
    logger.info('[UPDATE, PUT /api/post] 게시글 수정');
  });
};

const deletePost = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id }: Interface = request.query;
  const values: (string | string[])[] = [id];

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
    category,
    tags,
    title,
    content
  ) VALUES (
    $1,
    $2,
    $3,
    $4
  );
`;

const SELECT_POST = `
  SELECT
    p.id,
    p.category,
    p.tags,
    p.title,
    p.content,
    p.view_cnt AS "viewCnt",
    (SELECT COUNT(*) FROM post_like WHERE post_id = p.id) AS "likeCnt",
    (SELECT COUNT(*) FROM comment WHERE post_id = p.id AND delete_fl = false) AS "commentCnt",
    CASE WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'SS') AS INTEGER)) || ' 초 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'MI') AS INTEGER)) || ' 분 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'HH24') AS INTEGER)) || ' 시간 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'DD') AS INTEGER)) || ' 일 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'MM') AS INTEGER)) || ' 달 전'
      WHEN (CAST(TO_CHAR(NOW() - p.crt_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
        THEN (CAST(TO_CHAR(NOW() - p.crt_dttm, 'YYYY') AS INTEGER)) || ' 년 전'
    END AS time,
    CASE WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'YYYYMMDDHH24MISS') AS INTEGER) < 100)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'SS') AS INTEGER)) || ' 초 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'MI') AS INTEGER)) || ' 분 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'HH24') AS INTEGER)) || ' 시간 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 100000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'DD') AS INTEGER)) || ' 일 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 10000000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'MM') AS INTEGER)) || ' 달 전 수정'
      WHEN (CAST(TO_CHAR(NOW() - p.mfy_dttm,'YYYYMMDDHH24MISS') AS INTEGER) < 1000000000000)
        THEN (CAST(TO_CHAR(NOW() - p.mfy_dttm, 'YYYY') AS INTEGER)) || ' 년 전 수정'
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
    category = $1,
    tags = $2,
    title = $3,
    content = $4,
    mfy_dttm = NOW()
  WHERE id = $5
`;

const DELETE_POST = `
  UPDATE post
  SET
    delete_fl = true
  WHERE id = $1
`;

export default handler;
