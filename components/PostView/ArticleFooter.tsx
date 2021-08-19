import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Button from '@atoms/Button';
import * as T from '@types';

const ArticleFooter = () => {
  const router = useRouter();
  const { postStore, utilStore, signStore } = stores();
  const { postView, deletePost } = postStore;
  if (!postView) return null;

  const { id } = postView;
  const { toggleConfirmModal } = utilStore;
  const { userData } = signStore;

  const onDelete = useCallback(() => {
    deletePost(id, router);
  }, []);

  const onDeleteConfirm = useCallback(() => {
    toggleConfirmModal('해당 게시글을 삭제하시겠습니까?', onDelete);
  }, []);

  const onModify = useCallback(() => {
    router.push(`/post/modify/${id}`, undefined, { shallow: false });
  }, []);

  if (!userData?.adminFl) return null;

  return (
    <ArticleFooterWrapper>
      <Button
        size={T.ButtonSize.SMALL}
        variant="outlined"
        color="secondary"
        onClick={onDeleteConfirm}
      >
        삭제
      </Button>
      <Button
        size={T.ButtonSize.SMALL}
        variant="outlined"
        color="default"
        onClick={onModify}
      >
        수정
      </Button>
    </ArticleFooterWrapper>
  );
};

const ArticleFooterWrapper = styled.div`
  background: #f8f9fa;
  padding: 12px;
  text-align: right;
  
  & > button {
    margin-left: 5px;
  }
`;

export default observer(ArticleFooter);
