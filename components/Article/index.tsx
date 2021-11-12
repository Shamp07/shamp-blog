import React from 'react';
import styled from '@emotion/styled';

import * as T from '@types';
import { MediaQuery } from '@constants/styles';
import dsPalette from '@constants/ds-palette';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Comment from './Comment';

const Article = () => (
  <article>
    <Wrapper>
      <Header />
      <Content />
      <Footer />
    </Wrapper>
    <Comment />
  </article>
);

const Wrapper = styled.div({
  backgroundColor: dsPalette.themeWhite.toString(),
  borderRadius: '14px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',

  [MediaQuery[T.Device.TABLET]]: {
    borderRadius: 0,
  },
});

export default Article;
