import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { TextField } from '@material-ui/core';
import useStores from '../../../stores/useStores';
import CommentWrite from './CommentWrite';
import CommentMenu from './CommentMenu';

interface CommentRowInterface {
  id: number,
  commentId: number,
  userId: number,
  userName: string,
  commentUserName: string,
  content: string,
  time: string,
  modifiedTime: string,
  isTag: boolean,
}

const CommentRow = ({ data }: { data: CommentRowInterface }) => {
  const { CommentStore } = useStores();
  const {
    replyCommentId, modifierComment,
    modifierCommentId, modifierCommentHandleChange,
  } = CommentStore;

  const {
    id, commentId, userName,
    content, time, modifiedTime,
    isTag, commentUserName,
  } = data;

  return (
    <>
      <li>
        <CommentWrapper isReply={!!commentId}>
          {!!commentId && (<ReplyBorder />)}
          <CommentWriter>
            <span>{userName}</span>
            <span>{modifiedTime || time}</span>
          </CommentWriter>
          <CommentContent>
            {modifierCommentId === id ? (
              <CustomTextField
                type="text"
                multiline
                rows={3}
                onChange={modifierCommentHandleChange}
                value={modifierComment}
                placeholder="포스팅에 관련된 의견이나 질문을 자유롭게 남겨주세요!"
              />
            ) : (
              <>
                {isTag && (<NameTag>{commentUserName}</NameTag>)}
                {content}
              </>
            )}
          </CommentContent>
          <CommentMenu data={data} />
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

const CommentContent = styled.pre`
  margin-top: 8px;
  line-height: 20px;
  font-size: 14px;
  color: #1e2022;
  word-wrap: break-word;
  word-break: break-all;
`;

const ReplyBorder = styled.div`
  position: absolute;
  top: 13px;
  left: 35px;
  content: "";
  width: 12px;
  height: 12px;
  z-index: 0;
  border-left: 1px solid #c5cbd0;
  border-bottom: 1px solid #c5cbd0;
`;

const NameTag = styled.span`
  color: #1e73c9;
  margin-right: 5px;
`;

const CustomTextField = styled(TextField)`
  display: block !important;
  background-color: #fff;
  
  & .MuiInputBase-multiline {
    display: block !important;
    width: 100%;
    padding-left:10px;
    padding-right: 10px;
    max-width: 100%;
  }
  
  & textarea {
    font-size: 14px;
  }
`;

export default observer(CommentRow);
