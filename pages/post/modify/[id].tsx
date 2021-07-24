import React from 'react';
import { useRouter } from 'next/router';

import useStores from '@stores/useStores';
import * as T from '@types';
import Post from '..';

const ModifyPost = () => {
  const router = useRouter();
  const { SignStore, AlertStore } = useStores();
  const { userData } = SignStore;
  const { toggleAlertModal } = AlertStore;

  if (!userData?.adminFl) {
    router.push('/').then(() => toggleAlertModal('글 수정 권한이 없습니다.'));
    return null;
  }

  return <Post isModify />;
};

ModifyPost.getInitialProps = async ({ query, store }: T.MyNextPageContext) => {
  if (!store) return null;

  const { PostStore } = store;
  const { getPost } = PostStore;

  const id = Number(query.id);

  await getPost(id, true);

  return {
    props: {},
  };
};

export default ModifyPost;
