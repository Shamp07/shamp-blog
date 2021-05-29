import React from 'react';

import PostView from '../../components/PostView';
import { MyNextPageContext } from '../_app';

const Post = () => <PostView />;

Post.getInitialProps = async ({ query, store }: MyNextPageContext) => {
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
