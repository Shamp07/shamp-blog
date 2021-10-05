import React from 'react';
import { useRouter } from 'next/router';

import stores from '@stores';
import * as T from '@types';
import Article from '@components/Article';
import Header from './Header';
import Content from '@components/Board/Content';
import Pagination from '@components/Board/Pagination';

const Board = () => {
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
      <Header />
      <Content />
      <Pagination />
    </>
  );
};

export default Board;
