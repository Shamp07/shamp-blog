import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import stores from '@stores';

interface Props {
  size: number;
  increaseSize(): void;
}

const More = ({
  size, increaseSize,
}: Props) => {
  const { commentStore, postStore } = stores();
  const { postView } = postStore;
  if (!postView) return null;

  const { id } = postView;

  const onMore = useCallback(() => {
    increaseSize();
    commentStore.getComment(id, size);
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

export default More;
