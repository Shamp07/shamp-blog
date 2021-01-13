import { Client } from 'pg';
import Database from '../../../database/Database';

const handler = (request: any, response: any) => {
  if (request.method === 'POST') {
    const {
      category, tags, title, content,
    } = request.body;

    const values: Array<string> = [category, tags, title, content];

    Database.execute(
      (database: Client) => database.query(
        INSERT_POST,
        values,
      )
        .then(() => {
          response.json({
            success: true,
            message: '😀 정상적으로 글이 업로드 되었어요!',
          });
        }),
    ).then(() => {
      console.log('[INSERT, POST /api/post] 게시글 작성');
    });
  }
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

export default handler;
