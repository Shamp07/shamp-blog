import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import { CommentType } from '@stores/CommentStore';
import useStores from '../../../../stores/useStores';

export interface Props {
  data: CommentType;
}

const CommentNormalMenu = ({ data }: Props) => {
  const {
    PostStore, CommentStore, SignStore,
    UtilStore,
  } = useStores();
  const { postView } = PostStore;
  const { id: postId } = postView;
  const { setReplyCommentId, setModifierCommentId, deleteComment } = CommentStore;
  const { userData } = SignStore;
  const { toggleConfirmModal } = UtilStore;

  const { id, userId, content } = data;

  const isMine = userData?.id === userId;

  return (
    <CommentMenu>
      {isMine && (
        <>
          <span
            role="button"
            tabIndex={0}
            onClick={() => toggleConfirmModal(
              '해당 댓글을 삭제하시겠습니까?',
              () => deleteComment(id, postId),
            )}
            onKeyDown={() => deleteComment(id, postId)}
          >
            삭제
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={() => setModifierCommentId(id, content)}
            onKeyDown={() => setModifierCommentId(id, content)}
          >
            수정
          </span>
        </>
      )}
      {Boolean(userData) && (
        <span
          role="button"
          tabIndex={0}
          onClick={() => setReplyCommentId(id)}
          onKeyDown={() => setReplyCommentId(id)}
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

export default observer(CommentNormalMenu);
