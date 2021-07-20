import React from 'react';
import styled from '@emotion/styled';

import * as T from '@types';
import { MediaQuery } from '@styles';
import CommentSection from './CommentSection';
import ArticleFooter from './ArticleFooter';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';

const PostView = () => (
  <>
    <Section>
      <ArticleHeader />
      <ArticleContent />
      <ArticleFooter />
    </Section>
    <CommentSection />
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

export default PostView;
