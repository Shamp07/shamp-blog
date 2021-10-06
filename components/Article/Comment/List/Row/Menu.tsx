import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';
import * as T from '@types';
import dsPalette from '@constants/ds-palette';

export interface Props {
  data: T.Comment;
  modifyId: T.Comment['id'];
  size: number;
  setModifyId(value: T.Comment['id']): void;
  setReplyId(value: T.Comment['id']): void;
  setComment(value: T.Comment['content']): void;
  onModify(): void;
}

const Menu = ({
  data, modifyId, size,
  setModifyId, setReplyId, setComment, onModify,
}: Props) => {
  const { id, content } = data;
  const {
    commentStore, signStore, utilStore, postStore,
  } = stores();
  const { article } = postStore;
  if (!article) return null;

  const { id: postId } = article;

  const { userData } = signStore;

  const onCancel = useCallback(() => {
    setModifyId(0);
  }, []);

  const onDelete = useCallback(() => {
    commentStore.deleteComment(id, postId, size);
  }, []);

  const onModifyMode = useCallback(() => {
    setComment(content);
    setModifyId(id);
  }, [content]);

  const onReply = useCallback(() => {
    setReplyId(id);
  }, []);

  const onDeleteConfirm = useCallback(() => {
    utilStore.openPopup(T.Popup.CONFIRM, '해당 댓글을 삭제하시겠습니까?', onDelete);
  }, []);

  if (id === modifyId) {
    return (
      <Root>
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
      </Root>
    );
  }

  return (
    <Root>
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
        onClick={onModifyMode}
        onKeyDown={onModifyMode}
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
    </Root>
  );
};

const Root = styled.div({
  marginTop: '8px',
  fontSize: '14px',

  '& > span': {
    marginRight: '10px',
    cursor: 'pointer',
  },

  '& > span:first-of-type': {
    color: dsPalette.themeWarning.toString(),
    marginRight: '10px',
  },

  '& > span:last-child': {
    color: dsPalette.themeDefault.toString(),
  },
});

const ReplyIcon = styled(FontAwesomeIcon)`
  width: 14px;
  height: 14px;
  margin-right: 5px;
  vertical-align: middle;
`;

export default observer(Menu);
