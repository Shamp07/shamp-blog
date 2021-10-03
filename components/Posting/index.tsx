import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';
import { MediaQuery } from '@styles';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface Props {
  isModify: boolean;
}

const Posting = ({ isModify }: Props) => {
  const router = useRouter();

  const { postStore, signStore, utilStore } = stores();
  const { addPost, modifyPost } = postStore;
  const { userData } = signStore;
  const { openPopup } = utilStore;

  if (!userData?.adminFl) {
    router.push('/').then(() => openPopup(
      T.Popup.ALERT,
      `글 ${isModify ? '수정' : '작성'} 권한이 없습니다.`,
    ));
    return null;
  }

  const onSubmit = useCallback(() => {
    if (isModify) modifyPost(router);
    else addPost(router);
  }, []);

  const submitText = useMemo(() => (isModify ? '수정' : '등록'), []);

  return (
    <Root>
      <Header />
      <Content />
      <Footer
        submitText={submitText}
        onSubmit={onSubmit}
      />
    </Root>
  );
};

const Root = styled.div({
  padding: '24px',
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  borderRadius: '14px',
  overflow: 'hidden',

  '& .MuiInputBase-root': {
    borderRadius: '10px',
    overflow: 'hidden',
  },

  '& .MuiPaper-rounded': {
    borderRadius: '10px',
  },

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },
});

export default observer(Posting);
