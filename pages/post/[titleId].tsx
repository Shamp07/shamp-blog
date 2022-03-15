import React from 'react';
import { NextPageContext } from 'next';

import stores from '@stores';
import Article from '@components/Article';

const Post = () => <Article />;

Post.getInitialProps = async ({ query }: NextPageContext) => {
  const { postStore } = stores();

  const titleId = String(query.titleId);

  await postStore.getPost(titleId);

  return {
    props: {},
  };
};

export default Post;
