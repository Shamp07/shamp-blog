import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import stores from '@stores';

const CommentModifyMenu = () => {
  const { postStore, commentStore } = stores();
  const { postView } = postStore;
  if (!postView) return null;

  const { id: postId } = postView;
  const { modifierCommentId: id } = commentStore;

  const onCancel = useCallback(() => {
    commentStore.setModifierCommentId(0, '');
  }, []);

  const onModify = useCallback(() => {
    commentStore.modifyComment(id, postId);
  }, [id, postId]);

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

export default CommentModifyMenu;
