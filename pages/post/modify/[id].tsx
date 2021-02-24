import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Post from '..';
import useStores from '../../../stores/useStores';
import { MyNextPageContext } from '../../_app';

const ModifyPost: NextPage = () => {
  const { SignStore, AlertStore } = useStores();
  const { userData } = SignStore;
  const { toggleAlertModal } = AlertStore;
  const router = useRouter();

  if (!userData || !userData.adminFl) {
    router.push('/').then(() => {
      toggleAlertModal('글 수정 권한이 없습니다.');
    });
    return null;
  }

  return (
    <Post isModify />
  );
};

ModifyPost.getInitialProps = async ({ query, store }: MyNextPageContext) => {
  if (!store) return false;
  const { PostStore } = store;
  const { getPost } = PostStore;
  await getPost(Number(query.id), true);

  return {
    props: {},
  };
};

export default ModifyPost;
