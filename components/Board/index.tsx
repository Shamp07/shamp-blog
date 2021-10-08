import React from 'react';
import { useRouter } from 'next/router';

import stores from '@stores';
import * as T from '@types';
import Article from '@components/Article';
import Content from '@components/Board/Content';
import Footer from '@components/Board/Footer';
import { categoryName } from '@constants/category';
import Header from './Header';

const Board = () => {
  const router = useRouter();
  if (!router.query.category) return null;

  const { utilStore } = stores();

  if (!categoryName[router.query.category[0]]) {
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
      <Footer />
    </>
  );
};

export default Board;
