import React from 'react';
import styled from 'styled-components';
import CommentHeader from './CommentHeader';
import CommentWrite from './CommentWrite';
import CommentList from './CommentList';
import CommentReply from './CommentReply';

const CommentSection: React.FC = () => (
  <Wrapper>
    <CommentHeader />
    <CommentWrite />
    <CommentList />
    <CommentReply />
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  margin-top: 16px;
`;

export default CommentSection;
