import React from 'react';

import Home from '@components/Home';
import stores from '@stores';
import * as T from '@types';

interface Props {
  posts: T.Post[];
}

const Page = ({ posts }: Props) => {
  return (
    <Home posts={posts} isTemporary={false} />
  );
};

Page.getInitialProps = async () => {
  const { postStore } = stores();

  const posts = await postStore.getPosts();

  return {
    posts,
  };
};

export default Page;
