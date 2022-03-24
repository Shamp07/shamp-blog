import cookie from 'cookie';
import * as T from '@types';
import jwt from 'jsonwebtoken';
import { NextPageContext } from 'next';

import config from '@config/jwt.config.json';
import stores from '@stores';

// eslint-disable-next-line import/prefer-default-export
export const isAdmin = ({ req, res }: NextPageContext) => {
  const isServer = Boolean(req && res);

  if (isServer) {
    const cookieStr = req?.headers.cookie;

    if (!cookieStr) return false;

    const { auth } = cookie.parse(cookieStr);

    let decodedToken: T.AuthToken | undefined;
    try {
      decodedToken = jwt.verify(auth, config.secret) as T.AuthToken;
    } catch {
      return false;
    }

    return auth && decodedToken.adminFl;
  }

  const { signStore } = stores();
  const { userData } = signStore;

  return userData?.adminFl;
};
