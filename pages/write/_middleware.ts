import { NextRequest, NextResponse } from 'next/server';

import { Page } from '@utilities/route';
import jwt from 'jsonwebtoken';
import config from '@config/jwt.config.json';
import * as T from '@types';

const middleware = (req: NextRequest) => {
  const { auth } = req.cookies;

  if (auth) {
    const decodedToken = jwt.verify(auth, config.secret) as T.AuthToken;

    if (decodedToken.adminFl) return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = Page.HOME;
  url.search = '';
  return NextResponse.redirect(url);
};

export default middleware;
