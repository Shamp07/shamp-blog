import React from 'react';
import { NextPageContext } from 'next';

import Write from '@components/Write';
import { isAdmin } from '@utilities/auth';
import { Page } from '@utilities/route';

const WritePage = () => <Write />;

WritePage.getInitialProps = (context: NextPageContext) => {
  if (!isAdmin(context)) {
    const { res } = context;

    res?.writeHead(307, { Location: Page.HOME });
    res?.end();
  }

  return {};
};

export default WritePage;
