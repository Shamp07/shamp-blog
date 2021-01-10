import client from '../../database/db-connection';

const handler = (request: any, response: any) => {
  console.log('!!');
  if (request.method === 'POST') {
    const {
      category, tags, title, content,
    } = request.body;

    const values: Array<string> = [category, tags, title, content];
    client.connect();
    client.query(INSERT_POST, values, (err: any) => {
      if (err) {
        console.log(err);
      }
      client.end();
      response.json({
        success: true,
        message: '😀 정상적으로 글이 업로드 되었어요!',
      });
    });
  }
};

const INSERT_POST = `
  INSERT INTO POST (
    category,
    tags,
    title,
    content
   )
   VALUES (
    $1,
    $2,
    $3,
    $4
  );
`;

export default handler;
