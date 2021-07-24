import React from 'react';

import * as T from '@types';
import PostView from '../../components/PostView';

const Post = () => <PostView />;

Post.getInitialProps = async ({ query, store }: T.MyNextPageContext) => {
  if (!store) return null;

  const { PostStore, CommentStore } = store;
  const { getPost } = PostStore;
  const { getComment } = CommentStore;

  const id = Number(query.id);

  await Promise.all([getPost(id, false), getComment(id)]);

  return {
    props: {},
  };
};

export default Post;
