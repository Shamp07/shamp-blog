import React from 'react';
import { NextPageContext } from 'next';
import jwt from 'jsonwebtoken';

import Write from '@components/Write';
import config from '@config/jwt.config.json';
import * as T from '@types';

const WritePage = () => <Write />;

WritePage.getInitialProps = ({ req, res }: NextPageContext) => {
  if (!res || !req) return;

  if (req && req.headers.cookie) {
    const decodedToken = jwt.verify(auth, config.secret) as T.AuthToken;

    if (!decodedToken.adminFl) {
      res.writeHead(307, { Location: '/' });
      res.end();
    }
  }
};

export default WritePage;
