import React from 'react';
import { useRouter } from 'next/router';

import stores from '@stores';
import * as T from '@types';
import Post from '..';

const ModifyPost = () => {
  const router = useRouter();
  const { signStore, alertStore } = stores();
  const { userData } = signStore;
  const { toggleAlertModal } = alertStore;

  if (!userData?.adminFl) {
    router.push('/').then(() => toggleAlertModal('글 수정 권한이 없습니다.'));
    return null;
  }

  return <Post isModify />;
};

ModifyPost.getInitialProps = async ({ query }: T.MyNextPageContext) => {
  const { postStore } = stores();

  const id = Number(query.id);

  await postStore.getPost(id, true);

  return {
    props: {},
  };
};

export default ModifyPost;
