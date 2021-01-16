import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';

const CommentWrite: React.FC = () => {
  const { PostStore, CommentStore } = useStores();
  const { postView } = PostStore;
  const { id } = postView;
  const { comment, addComment, commentHandleChange } = CommentStore;

  return (
    <CommentWriteWrapper>
      <CommentWriterInner>
        <CustomTextField
          multiline
          rows={3}
          onChange={commentHandleChange}
          value={comment}
        />
        <CommentWriteFooter>
          <CommentWriteButton onClick={() => addComment(id)}>
            작성
          </CommentWriteButton>
        </CommentWriteFooter>
      </CommentWriterInner>
    </CommentWriteWrapper>
  );
};

const CommentWriteWrapper = styled.div`
  padding: 24px 16px;
  background-color: #f8f9fa;
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

export default observer(CommentWrite);
