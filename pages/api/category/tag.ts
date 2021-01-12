import Database from '../../../database/Database';

const handler = (request: any, response: any) => {
  if (request.method === 'GET') {
    const { category } = request.query;
    response.setHeader('Access-Control-Allow-Origin', 'localhost:3000');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    const values: Array<string> = [category];

    // Database
    //   .query(SELECT_CATEGORY_TAGS, values)
    //   .then(({ rows }: any) => {
    //     console.log('row');
    //     console.log(rows);
    //     response.json({
    //       success: true,
    //       result: rows,
    //     });
    //   });

    Database.execute(
      (database) => database.query(
        SELECT_CATEGORY_TAGS,
        values,
      )
        .then((rows: any) => {
          console.log(rows.rows);
          response.json({
            success: true,
            result: rows.rows,
          });
        }),
    ).then(() => {
      console.log('[SELECT, GET /api/category/api] 현재 게시판 조회');
    });
  }
};

const SELECT_CATEGORY_TAGS = `
  SELECT DISTINCT tags FROM post
  WHERE category = $1
`;

export default handler;
