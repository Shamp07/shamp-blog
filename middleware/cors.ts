import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const initMiddleware = (
  middleware: Function,
) => (
  req: NextApiRequest, res: NextApiResponse,
) => new Promise((resolve, reject) => {
  middleware(req, res, (result: object) => {
    if (result instanceof Error) {
      return reject(result);
    }
    return resolve(result);
  });
});

const cors = initMiddleware(
  Cors({
    origin: 'http://shamp.kr',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

export default cors;
