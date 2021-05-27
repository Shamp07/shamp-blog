import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStores from '@stores/useStores';

const CommentHeader = () => {
  const { PostStore, CommentStore } = useStores();
  const { postView } = PostStore;
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
      <RightButton size="small" variant="outlined" onClick={() => getComment(id)}>
        <span>
          <ReloadICon icon={faSync} />
          {' '}
          새로고침
        </span>
      </RightButton>
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

const RightButton = styled(Button)`
  position: absolute !important;
  top: 11px;
  right: 14px;
`;

const ReloadICon = styled(FontAwesomeIcon)`
  vertical-align: baseline;
  width: 12px;
  height: 12px;
`;

export default observer(CommentHeader);
