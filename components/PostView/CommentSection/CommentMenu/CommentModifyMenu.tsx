import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';

const CommentModifyMenu = () => {
  const { PostStore, CommentStore } = useStores();
  const { postView } = PostStore;
  if (!postView) return null;

  const { id: postId } = postView;
  const { modifierCommentId: id, setModifierCommentId, modifyComment } = CommentStore;

  const modifyCancel = useCallback(() => {
    setModifierCommentId(0, '');
  }, []);

  const modify = useCallback(() => {
    modifyComment(id, postId);
  }, []);

  return (
    <CommentMenu>
      <span
        role="button"
        tabIndex={0}
        onClick={modifyCancel}
        onKeyDown={modifyCancel}
      >
        취소
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={modify}
        onKeyDown={modify}
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
