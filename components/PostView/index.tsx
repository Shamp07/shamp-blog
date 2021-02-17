import React from 'react';
import styled from '@emotion/styled';
import CommentSection from './CommentSection';
import ArticleFooter from './ArticleFooter';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';

const PostView: React.FC = () => (
  <div>
    <ArticleSection>
      <ArticleHeader />
      <ArticleContent />
      <ArticleFooter />
    </ArticleSection>
    <CommentSection />
  </div>
);

const ArticleSection = styled.article`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`;

export default PostView;
