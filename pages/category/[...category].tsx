import React from 'react';
import { NextPageContext } from 'next';

import stores from '@stores';
import Board from '@components/Board';

const Category = () => <Board />;

Category.getInitialProps = async ({ query }: NextPageContext) => {
  if (!query.category) return null;

  const category = query.category[0];
  const tag = query.category[1];
  if (tag === 'post') {
    const { postStore, commentStore } = stores();

    const id = Number(query.category[2]);

    await Promise.all([
      postStore.getPost(id, false),
      commentStore.getComment(id),
    ]);
  } else {
    const { categoryStore, postStore } = stores();

    const page = Number(query.page ?? 1);

    await Promise.all([
      postStore.getPostList(category, tag, page),
      categoryStore.getTags(category),
    ]);
  }

  return {
    props: {},
  };
};

export default Category;
