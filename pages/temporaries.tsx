import React from 'react';
import { NextPageContext } from 'next';

import stores from '@stores';
import { isAdmin } from '@utilities/auth';
import Home from '@components/Home';
import * as T from '@types';

interface Props {
  posts: T.Post[];
}

const TemporariesPage = ({ posts }: Props) => <Home posts={posts} isTemporary />;

TemporariesPage.getInitialProps = async (context: NextPageContext) => {
  if (!isAdmin(context)) {
    const { res } = context;

    res?.writeHead(307, { Location: '/' });
    res?.end();
  } else {
    const { postStore } = stores();

    const posts = await postStore.getTemporaryPosts();

    return {
      posts,
    };
  }

  return {};
};

export default TemporariesPage;
