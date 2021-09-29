import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import { MediaQuery } from '@styles';
import * as T from '@types';
import Header from './Header';
import Form from './Form';
import List from './List';

const Comment = () => {
  const { signStore } = stores();
  const { userData } = signStore;

  const info = useLocalObservable(() => ({
    modifyId: 0,
    replyId: 0,
    size: 15,
    setModifyId(id: number) {
      this.modifyId = id;
    },
    setReplyId(id: number) {
      this.replyId = id;
    },
    increaseSize() {
      this.size += 10;
    },
  }));

  const form = userData ? (
    <Form isReply={false} size={info.size} />
  ) : null;

  return (
    <Root>
      <Header />
      {form}
      <List
        modifyId={info.modifyId}
        replyId={info.replyId}
        size={info.size}
        setModifyId={info.setModifyId}
        setReplyId={info.setReplyId}
        increaseSize={info.increaseSize}
      />
    </Root>
  );
};

const Root = styled.div({
  backgroundColor: '#fff',
  borderRadius: '14px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  marginTop: '16px',
  overflow: 'hidden',

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },
});

export default observer(Comment);
