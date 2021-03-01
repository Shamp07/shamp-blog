import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

const CommentSection = () => {
  const { SignStore } = useStores() as RootStore;
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
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  margin-top: 16px;
`;

export default observer(CommentSection);
