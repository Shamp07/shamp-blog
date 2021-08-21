import React from 'react';

import * as T from '@types';
import stores from '@stores';
import PostView from '@components/PostView';

const Post = () => <PostView />;

Post.getInitialProps = async ({ query }: T.MyNextPageContext) => {
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
