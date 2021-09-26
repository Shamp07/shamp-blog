import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import * as T from '@types';
import stores from '@stores';

export interface Props {
  data: T.Comment;
  setComment(value: T.Comment['content']): void;
}

const Menu = ({ data, setComment }: Props) => {
  const {
    postStore, commentStore, signStore, utilStore,
  } = stores();
  const { postView } = postStore;
  if (!postView) return null;

  const { id: postId } = postView;
  const { userData } = signStore;

  const { id, content } = data;

  const onDelete = useCallback(() => {
    commentStore.deleteComment(id, postId);
  }, []);

  const onModify = useCallback(() => {
    setComment(content);
    commentStore.setModifyId(id);
  }, []);

  const onReply = useCallback(() => {
    commentStore.setReplyId(id);
  }, []);

  const onDeleteConfirm = useCallback(() => {
    utilStore.openPopup(T.Popup.CONFIRM, '해당 댓글을 삭제하시겠습니까?', onDelete);
  }, []);

  return (
    <CommentMenu>
      <span
        role="button"
        tabIndex={0}
        onClick={onDeleteConfirm}
        onKeyDown={onDeleteConfirm}
      >
        삭제
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={onModify}
        onKeyDown={onModify}
      >
        수정
      </span>
      {Boolean(userData) && (
        <span
          role="button"
          tabIndex={0}
          onClick={onReply}
          onKeyDown={onReply}
        >
          <ReplyIcon icon={faReply} />
          답글 쓰기
        </span>
      )}
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

const ReplyIcon = styled(FontAwesomeIcon)`
  width: 14px;
  height: 14px;
  margin-right: 5px;
  vertical-align: middle;
`;

export default observer(Menu);
