import React from 'react';
import styled from '@emotion/styled';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

interface CommentWriteProps {
  isReply: boolean;
}

const CommentWrite = ({ isReply }: CommentWriteProps) => {
  const { PostStore, CommentStore } = useStores() as RootStore;
  const { postView } = PostStore;
  const { id } = postView;
  const {
    commentInfo, addComment,
    commentHandleChange, replyCommentId,
  } = CommentStore;
  const { comment, replyComment } = commentInfo;

  return (
    <CommentWriteWrapper isReply={isReply}>
      { isReply && <ReplyBorder />}
      <CommentWriterInner>
        <CustomTextField
          type="text"
          multiline
          rows={3}
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
            <CommentWriteButton onClick={() => addComment(id, replyCommentId, isReply)}>
              작성
            </CommentWriteButton>
          </span>
        </CommentWriteFooter>
      </CommentWriterInner>
    </CommentWriteWrapper>
  );
};

const CommentWriteWrapper = styled.div<CommentWriteProps>`
  position: relative;
  padding: ${(props) => (props.isReply ? '24px 16px 24px 64px' : '24px 16px')};
  background-color: #f8f9fa;
`;

const CommentWriterInner = styled.div`
  border: 1px solid #dddfe4;
`;

const CommentWriteFooter = styled.div`
  height: 36px;
  background-color: #fff;
  display: flex;
  
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

const CommentWriteButton = styled.div`
  display: inline-block;
  background-color: #2d79c7;
  text-align: center;
  padding: 10px;
  width: 50px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1e73c9;
  }
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
