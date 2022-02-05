import type { NextRequest } from 'next/server';

const middleware = (req: NextRequest) => {
  // eslint-disable-next-line no-console
  console.log(req);
};

export default middleware;
