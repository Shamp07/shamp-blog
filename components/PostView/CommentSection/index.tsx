import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';

const CommentSection = () => {
  const { SignStore } = useStores();
  const { userData } = SignStore;

  return (
    <Wrapper>
      <CommentHeader />
      {Boolean(userData) && <CommentWrite isReply={false} />}
      <CommentList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  margin-top: 16px;
`;

export default observer(CommentSection);
