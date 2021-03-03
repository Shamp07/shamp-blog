import React from 'react';
import PostView from '../../components/PostView';
import { MyNextPageContext } from '../_app';

const Post = () => <PostView />;

Post.getInitialProps = async ({ query, store }: MyNextPageContext) => {
  const { id } = query;
  if (store) {
    const { PostStore, CommentStore } = store;
    const { getPost } = PostStore;
    const { getComment } = CommentStore;

    await Promise.all([getPost(Number(id), false), getComment(Number(id))]);
  }

  return {
    props: {},
  };
};

export default Post;
