import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const CommentReply: React.FC = () => {
  return (
    <CommentWriteWrapper>
      <ReplyBorder />
      <CommentWriterInner>
        <CustomTextField
          multiline
          rows={3}
        />
        <CommentWriteFooter>
          <CommentWriteButton>
            작성
          </CommentWriteButton>
        </CommentWriteFooter>
      </CommentWriterInner>
    </CommentWriteWrapper>
  );
};

const CommentWriteWrapper = styled.div`
  padding: 12px 12px 12px 64px;
  background-color: #f8f9fa;
  position: relative;
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

const CommentWriterInner = styled.div`
  border: 1px solid #dddfe4;
`;

const CommentWriteFooter = styled.div`
  background-color: #fff;
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
    background-color: #52a7ff;
  }
`;

const CustomTextField = styled(TextField)`
  display: block !important;
  width: 100%;
  background-color: #fff;
  
  & .MuiInputBase-multiline {
    display: block !important;
    width: 100%;
    max-width: 100%;
  }
  
  & textarea {
    padding: 10px;
    font-size: 14px;
  }
`;

export default CommentReply;
