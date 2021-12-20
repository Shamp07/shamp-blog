import React from 'react';
import { NextPageContext } from 'next';

import stores from '@stores';
import Article from '@components/Article';

const Post = () => <Article />;

Post.getInitialProps = async ({ query }: NextPageContext) => {
  // const { postStore, commentStore } = stores();
  //
  // const id = Number(query.id);
  //
  // await Promise.all([
  //   postStore.getPost(id, false),
  //   commentStore.getComment(id),
  // ]);

  return {
    props: {},
  };
};

export default Post;
