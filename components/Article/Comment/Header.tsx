import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import stores from '@stores';
import Button from '@atoms/Button';
import * as T from '@types';

const Header = () => {
  const { postStore, commentStore } = stores();
  const { postView } = postStore;
  if (!postView) return null;

  const { getComment } = commentStore;
  const { id, commentCnt } = postView;

  const onRefresh = useCallback(() => {
    getComment(id);
  }, []);

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
          color="primary"
          variant="outlined"
          onClick={onRefresh}
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

export default observer(Header);
