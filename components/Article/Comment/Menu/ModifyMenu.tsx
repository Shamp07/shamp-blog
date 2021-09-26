import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import stores from '@stores';

interface Props {
  onModify(): void;
}

const ModifyMenu = ({ onModify }: Props) => {
  const { postStore, commentStore } = stores();
  const { postView } = postStore;
  if (!postView) return null;

  const onCancel = useCallback(() => {
    commentStore.setModifyId(0);
  }, []);

  return (
    <CommentMenu>
      <span
        role="button"
        tabIndex={0}
        onClick={onCancel}
        onKeyDown={onCancel}
      >
        취소
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={onModify}
        onKeyDown={onModify}
      >
        수정
      </span>
    </CommentMenu>
  );
};

const CommentMenu = styled.div`
  margin-top: 8px;
  font-size: 14px;
  
  & > span {
    margin-right: 10px;
    cursor: pointer;
  }
  
  & > span:first-of-type {
    color: #dc143c;
    margin-right: 10px;
  }
  
  & > span:last-child {
    color: #7b858e;
  }
`;

export default ModifyMenu;
