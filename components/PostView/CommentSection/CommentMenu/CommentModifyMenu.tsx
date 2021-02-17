import React from 'react';
import styled from '@emotion/styled';
import useStores from '../../../../stores/useStores';

const CommentModifyMenu: React.FC = () => {
  const { PostStore, CommentStore } = useStores();
  const { postView } = PostStore;
  const { id: postId } = postView;
  const { modifierCommentId: id, setModifierCommentId, modifyComment } = CommentStore;

  return (
    <CommentMenu>
      <span
        role="button"
        tabIndex={0}
        onClick={() => setModifierCommentId(0, '')}
        onKeyDown={() => setModifierCommentId(0, '')}
      >
        취소
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={() => modifyComment(id, postId)}
        onKeyDown={() => modifyComment(id, postId)}
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
