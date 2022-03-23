import { Client, QueryResult } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import { marked } from 'marked';

import Database from '@database/Database';
import authMiddleware from '@middleware/auth';
import cors from '@middleware/cors';
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

const generateRandomString = () => Math.random().toString(36).substring(2, 11);

const generateUniqueTitleId = (result: QueryResult, parsedTitle: string): string => {
  if (result.rows.length === 0) return parsedTitle;

  const generatedTitleId = `${parsedTitle}-${generateRandomString()}`;
  if (result.rows.find((row) => row.titleId !== generatedTitleId)) return generatedTitleId;

  return generateUniqueTitleId(result, parsedTitle);
};

const addPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    title, tags, content, isTemporary,
  } = request.body;

  const parsedTitle = titleURLParser(title);

  await Database.execute(
    (database: Client) => database.query(
      SELECT_POST_TITLE_ID,
      [parsedTitle],
    ).then((result) => {
      const titleId = generateUniqueTitleId(result, parsedTitle);

      const values = [tags, title, titleId, content, marked(content, {
        renderer: renderPlain(),
      }).substring(0, 500), getImagePath(content), isTemporary];
      return database.query(
        INSERT_POST,
        values,
      );
    })
      .then(() => {
        response.status(200).json({
          success: true,
        });
      }),
  );
};

const getPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const { titleId } = request.query;
  const values = [titleId];

  let article: T.Article | undefined;

  await Database.execute(
    (database: Client) => database.query(
      SELECT_POST,
      values,
    )
      .then((result) => {
        if (!result.rows.length) {
          return Promise.reject();
        }

        [article] = result.rows;
        return database.query(
          UPDATE_POST_VIEW_CNT,
          [article?.id],
        );
      })
      .then(() => {
        response.json({
          success: true,
          result: article,
        });
      }, () => {
        response.json({
          success: true,
          result: null,
        });
      }),
  );
};

const modifyPost = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    id, tags, title, content,
    isTemporary,
  } = request.body;
  const values = [tags, title, content, id, marked(content, {
    renderer: renderPlain(),
  }).substring(0, 500), getImagePath(content), isTemporary];

  await Database.execute(
    (database: Client) => database.query(
      UPDATE_POST,
      values,
    )
      .then(() => {
        response.json({
          success: true,
        });
      }),
  );
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
        });
      }),
  );
};

const INSERT_POST = `
  INSERT INTO POST (
    tags,
    title,
    title_id,
    content,
    short_content,
    thumbnail,
    temporary_fl
  ) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
  );
`;

const SELECT_POST_TITLE_ID = `
  SELECT p.*
  FROM post p
  WHERE p.title_id = $1
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
  WHERE 
    p.title_id = $1
    AND p.delete_fl = false
    AND p.temporary_fl = false
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
    temporary_fl = $7,
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
