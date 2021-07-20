import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';
import { MediaQuery } from "@styles";
import * as  T from '@types';

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

const Wrapper = styled.div({
  backgroundColor: '#fff',
  borderRadius: '14px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  marginTop: '16px',
  overflow: 'hidden',

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },
});

export default observer(CommentSection);
