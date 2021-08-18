import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import stores from '@stores';

const CommentMore = () => {
  const { CommentStore, PostStore } = stores();
  const { moreComment } = CommentStore;
  const { postView } = PostStore;
  if (!postView) return null;

  const { id } = postView;

  const onMore = useCallback(() => {
    moreComment(id);
  }, []);

  return (
    <Wrapper onClick={onMore}>
      댓글 더보기
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 8px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  min-height: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #7b858e;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default CommentMore;
