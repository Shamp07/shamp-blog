import React from 'react';
import { NextPageContext } from 'next';

import stores from '@stores';
import PostView from '@components/PostView';

const Post = () => <PostView />;

Post.getInitialProps = async ({ query }: NextPageContext) => {
  const { postStore, commentStore } = stores();

  const id = Number(query.id);

  await Promise.all([
    postStore.getPost(id, false),
    commentStore.getComment(id),
  ]);

  return {
    props: {},
  };
};

export default Post;
