import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useStores from '../../stores/useStores';

const ArticleFooter: React.FC = () => {
  const router = useRouter();
  const { PostStore } = useStores();
  const { postView, deletePost } = PostStore;
  const { id } = postView;

  return (
    <ArticleFooterWrapper>
      <Button size="small" variant="outlined" color="secondary" onClick={() => deletePost(id, router)}>
        삭제
      </Button>
      <Button size="small" variant="outlined" onClick={() => router.push('/post/modify/24', undefined, { shallow: false })}>
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

export default ArticleFooter;
