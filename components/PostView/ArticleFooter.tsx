import React from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

import useStores from '@stores/useStores';

const ArticleFooter = () => {
  const router = useRouter();
  const { PostStore, UtilStore, SignStore } = useStores();
  const { postView, deletePost } = PostStore;
  const { id } = postView;
  const { toggleConfirmModal } = UtilStore;
  const { userData } = SignStore;

  if (userData?.adminFl) return null;

  return (
    <ArticleFooterWrapper>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => toggleConfirmModal(
          '해당 게시글을 삭제하시겠습니까?',
          () => deletePost(id, router),
        )}
      >
        삭제
      </Button>
      <Button variant="outlined" onClick={() => router.push(`/post/modify/${id}`, undefined, { shallow: false })}>
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
