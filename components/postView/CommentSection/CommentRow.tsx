import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import CommentWrite from './CommentWrite';

export interface CommentRowInterface {
  id: number,
  commentId: number,
  userId: number,
  userName: string,
  content: string,
  time: string,
}

const CommentRow = ({ data }: { data: CommentRowInterface }) => {
  const { PostStore, CommentStore, SignStore } = useStores();
  const { postView } = PostStore;
  const { id: postId } = postView;
  const {
    replyCommentId, setReplyCommentId,
    setModifyCommentId, deleteComment,
  } = CommentStore;
  const { userData } = SignStore;

  const {
    id, commentId, userName,
    userId, content, time,
  } = data;

  let isMine: boolean = false;
  const loggedIn = !!userData;

  if (loggedIn) {
    const { id: userIdToken } = userData;
    isMine = userId === userIdToken;
  }

  return (
    <>
      <li>
        <CommentWrapper isReply={!!commentId}>
          {!!commentId && (<ReplyBorder />)}
          <CommentWriter>
            <span>{userName}</span>
            <span>{time}</span>
          </CommentWriter>
          <CommentContent>{content}</CommentContent>
          <CommentMenu>
            {isMine && (
              <>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => deleteComment(id, postId)}
                  onKeyDown={() => deleteComment(id, postId)}
                >
                  삭제
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => setModifyCommentId(id, postId)}
                  onKeyDown={() => setModifyCommentId(id, postId)}
                >
                  수정
                </span>
              </>
            )}
            {loggedIn && (
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
        </CommentWrapper>
      </li>
      {id === replyCommentId && <CommentWrite isReply />}
    </>
  );
};

interface CommentInterface {
  isReply: boolean;
}

const CommentWrapper = styled.div<CommentInterface>`
  position: relative;
  padding: ${(props) => (props.isReply ? '12px 12px 12px 64px' : '12px')};
  background-color: ${(props) => (props.isReply ? '#f8f9fa' : '#ffffff')};
`;

const CommentWriter = styled.div`
  line-height: 17px;
  font-weight: 700;
  color: #1e2022;
  
  & > span {
    padding: 0 10px;
  }

  & > span:first-child {
    padding-left: 0;
  }
  
  & > span:last-child {
    font-size: 14px;
    color: #7b858e;
    font-weight: normal;
    border-left: 1px solid #e6e6e6;
  }
`;

const CommentContent = styled.div`
  margin-top: 8px;
  line-height: 20px;
  font-size: 14px;
  color: #1e2022;
  word-wrap: break-word;
  word-break: break-all;
`;

const CommentMenu = styled.div`
  margin-top: 8px;
  font-size: 14px;
  
  & > span {
    margin-right: 10px;
    cursor: pointer;
  }
  
  & > span:first-child {
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

const ReplyBorder = styled.div`
  position: absolute;
  top: 13px;
  left: 35px;
  content: "";
  width: 12px;
  height: 12px;
  z-index: 1000;
  border-left: 1px solid #c5cbd0;
  border-bottom: 1px solid #c5cbd0;
`;

export default observer(CommentRow);
