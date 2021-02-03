import React from 'react';
import { NextPage } from 'next';
import PostView from '../../components/PostView';

const Post: NextPage = () => <PostView />;

Post.getInitialProps = async ({ query, store }: any) => {
  const { id } = query;
  const { PostStore, CommentStore } = store;
  const { getPost } = PostStore;
  const { getComment } = CommentStore;

  await Promise.all([getPost(id), getComment(id)]);

  return {
    props: {},
  };
};

export default Post;
