import React from 'react';
import { NextPageContext } from 'next';

import Write from '@components/Write';
import { isAdmin } from '@utilities/auth';

const WritePage = () => <Write />;

WritePage.getInitialProps = (context: NextPageContext) => {
  if (!isAdmin(context)) {
    const { res } = context;

    res?.writeHead(307, { Location: '/' });
    res?.end();
  }

  return {};
};

export default WritePage;
