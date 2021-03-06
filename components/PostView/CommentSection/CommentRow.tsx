import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

import useStores from '@stores/useStores';
import CommentWrite from './CommentWrite';
import CommentMenu from './CommentMenu';
import { Props } from './CommentMenu/CommentNormalMenu';

const CommentRow = ({ data }: Props) => {
  const { CommentStore } = useStores();
  const {
    commentInfo,
    replyCommentId, modifierCommentId, commentHandleChange,
  } = CommentStore;
  const { modifierComment } = commentInfo;

  const {
    id, commentId, userName,
    content, time, modifiedTime,
    isTag, commentUserName,
  } = data;

  const isModify = modifierCommentId === id;
  const isReply = id === replyCommentId;

  const contentArea = useMemo(() => (
    <>
      {isTag && (<NameTag>{commentUserName}</NameTag>)}
      {content}
    </>
  ), [isTag, content]);

  const modifyArea = useMemo(() => (
    isModify ? (
      <TextAreaWrapper>
        <Textarea
          minRows={2}
          maxRows={50}
          onChange={commentHandleChange}
          name="modifierComment"
          value={modifierComment}
          placeholder="포스팅에 관련된 의견이나 질문을 자유롭게 남겨주세요!"
        />
      </TextAreaWrapper>
    ) : contentArea
  ), [isModify]);

  return (
    <>
      <li>
        <CommentWrapper isReply={Boolean(commentId)}>
          {Boolean(commentId) && (<ReplyBorder />)}
          <CommentWriter>
            <span>{userName}</span>
            <span>{modifiedTime || time}</span>
          </CommentWriter>
          <CommentContent>
            {modifyArea}
          </CommentContent>
          <CommentMenu data={data} />
        </CommentWrapper>
      </li>
      {isReply && <CommentWrite isReply />}
    </>
  );
};

interface ReplyProp {
  isReply: boolean;
}

const CommentWrapper = styled.div<ReplyProp>(({ isReply }) => ({
  position: 'relative',
  ...(isReply ? ({
    padding: '16px 16px 16px 64px',
    backgroundColor: '#f8f9fa',
  }) : ({
    padding: '16px',
    backgroundColor: '#ffffff',
  })),
}));

const CommentWriter = styled.div`
  line-height: 17px;
  font-weight: 700;
  color: #1e2022;

  & > span {
    padding: 0 10px;
  }

  & > span:first-of-type {
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
  white-space: pre-wrap;
  word-wrap: break-word;
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

const Textarea = styled(TextareaAutosize)`
  display: block !important;
  width: 100%;
  resize: none;
  max-width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-family: inherit;
  border: 0;
  outline: 0;
`;

const TextAreaWrapper = styled.div`
  border: 1px solid #dddfe4;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  background-color: #fff;
`;

export default observer(CommentRow);
