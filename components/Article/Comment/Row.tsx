import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

import stores from '@stores';
import * as T from '@types';
import CommentWrite from './Form';
import CommentMenu from './Menu';

interface Props {
  data: T.Comment;
}

const Row = ({ data }: Props) => {
  const { commentStore, utilStore } = stores();
  const { replyCommentId, modifyId } = commentStore;

  const {
    id, postId, commentId, userName,
    content, time, modifiedTime,
    isTag, commentUserName,
  } = data;

  const isModify = modifyId === id;
  const isReply = id === replyCommentId;

  const form = useLocalObservable(() => ({
    values: {
      comment: '',
    },
    setComment(value: string) {
      this.values.comment = value;
    },
    onChange(event: ChangeEvent<HTMLTextAreaElement>) {
      if (event.target.value.length > 1000) return;
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
    onValidate() {
      if (!this.values.comment.trim()) {
        utilStore.openPopup(T.Popup.ALERT, '댓글 내용을 입력해주세요!');
        return false;
      }

      return true;
    },
  }));

  const onModify = useCallback(() => {
    if (!form.onValidate()) return;

    commentStore.modifyComment(id, postId, form.values.comment);
    commentStore.setModifyId(0);
  }, [form.values.comment]);

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
          onChange={form.onChange}
          name="comment"
          value={form.values.comment}
          placeholder="포스팅에 관련된 의견이나 질문을 자유롭게 남겨주세요!"
        />
      </TextAreaWrapper>
    ) : contentArea
  ), [isModify, form.values.comment, contentArea]);

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
          <CommentMenu data={data} setComment={form.setComment} onModify={onModify} />
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

export default observer(Row);
