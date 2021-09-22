import React, { ChangeEvent, useCallback } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

import stores from '@stores';
import Button from '@atoms/Button';
import * as T from '@types';

interface Props {
  isReply: boolean;
}

const CommentWrite = ({ isReply }: Props) => {
  const { postStore, commentStore, utilStore } = stores();
  const { postView } = postStore;
  if (!postView) return null;

  const { id } = postView;
  const { replyCommentId } = commentStore;

  const form = useLocalObservable(() => ({
    values: {
      comment: '',
      reply: '',
    },
    onChange(event: ChangeEvent<HTMLTextAreaElement>) {
      if (event.target.value.length > 1000) return;

      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
    onValidate() {
      if (!isReply && !this.values.comment.trim()) {
        utilStore.openPopup(T.Popup.ALERT, '댓글 내용을 입력해주세요');
        return false;
      }

      if (isReply && !this.values.reply.trim()) {
        utilStore.openPopup(T.Popup.ALERT, '답글 내용을 입력해주세요');
        return false;
      }

      return true;
    },
  }));

  const onSubmit = useCallback(() => {
    if (!form.onValidate()) return;

    commentStore.addComment(
      id,
      isReply ? form.values.reply : form.values.comment,
      replyCommentId,
      isReply,
    );
    if (isReply) form.values.reply = '';
    else form.values.comment = '';
  }, []);

  return (
    <CommentWriteWrapper isReply={isReply}>
      {isReply && <ReplyBorder />}
      <CommentWriterInner>
        <Textarea
          minRows={2}
          maxRows={50}
          onChange={form.onChange}
          name={isReply ? 'reply' : 'comment'}
          value={isReply ? form.values.reply : form.values.comment}
          placeholder="포스팅에 관련된 의견이나 질문을 자유롭게 남겨주세요!"
        />
        <CommentWriteFooter>
          <span>
            <span>
              (
              {isReply ? form.values.reply.length : form.values.comment.length}
              /1000)
            </span>
            <Button
              size={T.ButtonSize.SMALL}
              color="primary"
              variant="contained"
              onClick={onSubmit}
            >
              작성
            </Button>
          </span>
        </CommentWriteFooter>
      </CommentWriterInner>
    </CommentWriteWrapper>
  );
};

const CommentWriteWrapper = styled.div<Props>(({ isReply }) => ({
  position: 'relative',
  backgroundColor: '#f8f9fa',
  padding: isReply ? '24px 16px 24px 64px' : '16px',
}));

const CommentWriterInner = styled.div`
  border: 1px solid #dddfe4;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
`;

const CommentWriteFooter = styled.div`
  height: 36px;
  display: flex;
  margin-top: 12px;

  & > span {
    margin-left: auto;
  }

  & > span > span {
    display: inline-block;
    line-height: 36px;
    padding-right: 10px;
    font-size: 14px;
    color: #7b858e;
  }
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

const ReplyBorder = styled.div`
  position: absolute;
  top: 25px;
  left: 35px;
  content: "";
  width: 12px;
  height: 12px;
  z-index: 1000;
  border-left: 1px solid #c5cbd0;
  border-bottom: 1px solid #c5cbd0;
`;

export default observer(CommentWrite);
