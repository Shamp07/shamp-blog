import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';
import Form from '@components/Article/Comment/Form';
import Menu from './Menu';

interface Props {
  data: T.Comment;
  replyId: T.Comment['id'];
  modifyId: T.Comment['id'];
  size: number;
  setReplyId(id: T.Comment['id']): void;
  setModifyId(id: T.Comment['id']): void;
}

const Row = ({
  data, replyId, modifyId, size, setReplyId, setModifyId,
}: Props) => {
  const { commentStore, utilStore } = stores();

  const {
    id, postId, commentId, userName,
    content, time, modifiedTime,
    isTag, commentUserName,
  } = data;

  const isModify = modifyId === id;
  const isReply = replyId === id;

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

    commentStore.modifyComment(id, postId, form.values.comment, size);
    setModifyId(0);
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

  const replyForm = useMemo(() => (isReply ? (
    <Form
      isReply
      replyId={replyId}
      setReplyId={setReplyId}
      size={size}
    />
  ) : null), [isReply]);

  return (
    <>
      <li>
        <Wrapper isReply={Boolean(commentId)}>
          {Boolean(commentId) && (<ReplyBorder />)}
          <Writer>
            <span>{userName}</span>
            <span>{modifiedTime || time}</span>
          </Writer>
          <CommentContent>
            {modifyArea}
          </CommentContent>
          <Menu
            data={data}
            modifyId={modifyId}
            size={size}
            setModifyId={setModifyId}
            setReplyId={setReplyId}
            setComment={form.setComment}
            onModify={onModify}
          />
        </Wrapper>
      </li>
      {replyForm}
    </>
  );
};

const Wrapper = styled.div<{ isReply: boolean }>(({ isReply }) => ({
  position: 'relative',
  ...(isReply ? ({
    padding: '16px 16px 16px 64px',
    backgroundColor: '#f8f9fa',
  }) : ({
    padding: '16px',
    backgroundColor: '#ffffff',
  })),
}));

const Writer = styled.div`
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
