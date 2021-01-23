import React from 'react';
import { NextPage } from 'next';
import Post from '..';

const ModifyPost: NextPage = () => (
  <Post isModify />
);

ModifyPost.getInitialProps = async ({ query, store }: any) => {
  const { PostStore } = store;
  const { getPost } = PostStore;
  await getPost(query.id, true);

  return {
    props: {},
  };
};

export default ModifyPost;
