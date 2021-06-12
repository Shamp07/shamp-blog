import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import Button from '@atoms/Button';
import * as T from '@types';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  isReply: boolean;
}

const CommentWrite = ({ isReply }: Props) => {
  const { PostStore, CommentStore } = useStores();
  const { postView } = PostStore;
  const { id } = postView;
  const {
    commentInfo, addComment,
    commentHandleChange, replyCommentId,
  } = CommentStore;
  const { comment, replyComment } = commentInfo;

  return (
    <CommentWriteWrapper isReply={isReply}>
      {isReply && <ReplyBorder />}
      <CommentWriterInner>
        <Textarea
          type="text"
          minRows={2}
          maxRows={50}
          onChange={commentHandleChange}
          name={isReply ? 'replyComment' : 'comment'}
          value={isReply ? replyComment : comment}
          placeholder="포스팅에 관련된 의견이나 질문을 자유롭게 남겨주세요!"
        />
        <CommentWriteFooter>
          <span>
            <span>
              (
              {isReply ? replyComment.length : comment.length}
              /1000)
            </span>
            <Button
              size={T.ButtonSize.SMALL}
              color="primary"
              variant="contained"
              onClick={() => addComment(id, replyCommentId, isReply)}
            >
              작성
            </Button>
          </span>
        </CommentWriteFooter>
      </CommentWriterInner>
    </CommentWriteWrapper>
  );
};

const CommentWriteWrapper = styled.div<Props>`
  position: relative;
  padding: ${(props) => (props.isReply ? '24px 16px 24px 64px' : '16px')};
  background-color: #f8f9fa;
`;

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
