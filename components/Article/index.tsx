import React from 'react';
import styled from '@emotion/styled';

import * as T from '@types';
import { MediaQuery } from '@styles';
import Comment from './Comment';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Article = () => (
  <>
    <Section>
      <Header />
      <Content />
      <Footer />
    </Section>
    <Comment />
  </>
);

const Section = styled.section({
  overflow: 'hidden',
  backgroundColor: '#fff',
  borderRadius: '14px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },
});

export default Article;
