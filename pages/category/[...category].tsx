import React from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

import stores from '@stores';
import * as T from '@types';
import BoardHead from '@components/board/BoardHead';
import BoardContent from '@components/board/BoardContent';
import BoardPagination from '@components/board/BoardPagination';
import Article from '@components/Article';

const Category = () => {
  const router = useRouter();
  if (!router.query.category) return null;

  const { utilStore, sidebarStore } = stores();

  if (!sidebarStore.getCategoryName(router.query.category[0])) {
    router.push('/').then(() => {
      utilStore.openPopup(T.Popup.ALERT, '존재하지 않는 게시판입니다.');
    });
    return null;
  }

  if (router.query.category[1] === 'post') return <Article />;

  return (
    <>
      <BoardHead />
      <BoardContent />
      <BoardPagination />
    </>
  );
};

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
