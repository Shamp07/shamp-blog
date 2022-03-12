import React from 'react';
import { NextPageContext } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import Write from '@components/Write';
import stores from '@stores';
import config from '@config/jwt.config.json';
import * as T from '@types';

const WritePage = () => <Write />;

WritePage.getInitialProps = ({ req, res }: NextPageContext) => {
  const isAdmin = (() => {
    const isServer = Boolean(req && res);

    if (isServer) {
      const cookieStr = req?.headers.cookie;

      if (!cookieStr) return false;

      const { auth } = cookie.parse(cookieStr);

      return auth && (jwt.verify(auth, config.secret) as T.AuthToken).adminFl;
    }

    const { signStore } = stores();
    const { userData } = signStore;

    return userData?.adminFl;
  })();

  if (!isAdmin) {
    res?.writeHead(307, { Location: '/' });
    res?.end();
  }

  return {
    props: {},
  };
};

export default WritePage;
