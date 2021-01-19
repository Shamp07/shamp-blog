import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import CommentHeader from './CommentHeader';
import CommentWrite from './CommentWrite';
import CommentList from './CommentList';
import useStores from '../../../stores/useStores';

const CommentSection: React.FC = () => {
  const { SignStore } = useStores();
  const { userData } = SignStore;
  const loggedIn = !!userData;

  return (
    <Wrapper>
      <CommentHeader />
      {loggedIn && <CommentWrite isReply={false} />}
      <CommentList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  margin-top: 16px;
`;

export default observer(CommentSection);
