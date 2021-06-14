import React from 'react';
import styled from '@emotion/styled';

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

const Section = styled.section`
  overflow: hidden;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);

  @media (max-width: 1064px) {
    border-radius: 0;
  }
`;

export default PostView;
