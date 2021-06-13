import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStores from '@stores/useStores';
import Button from '@atoms/Button';
import * as T from '@types';

const CommentHeader = () => {
  const { PostStore, CommentStore } = useStores();
  const { postView } = PostStore;
  if (!postView) return null;

  const { getComment } = CommentStore;
  const { id, commentCnt } = postView;

  return (
    <CommentHeaderWrapper>
      <h2>댓글</h2>
      <span>
        총
        {' '}
        <span>
          {commentCnt}
        </span>
        {' '}
        개
      </span>
      <ButtonWrapper>
        <Button
          size={T.ButtonSize.SMALL}
          color="default"
          variant="outlined"
          onClick={() => getComment(id)}
        >
          <ReloadICon icon={faSync} />
          새로고침
        </Button>
      </ButtonWrapper>
    </CommentHeaderWrapper>
  );
};

const CommentHeaderWrapper = styled.div`
  z-index: 100;
  position: relative;
  padding: 16px;
  
  & > h2 {
    display: inline;
    font-size: 18px;
    margin-right: 5px;
  }
  
  & > span {
    font-size: 14px;
    
    & > span {
      color: #2d79c7;
    }
  }
`;

const ButtonWrapper = styled.div`
  & > button {
    position: absolute;
    top: 11px;
    right: 14px;
  }
  
  & svg {
    margin-right: 5px;
  }
`;

const ReloadICon = styled(FontAwesomeIcon)`
  vertical-align: baseline;
  width: 12px;
  height: 12px;
`;

export default observer(CommentHeader);
