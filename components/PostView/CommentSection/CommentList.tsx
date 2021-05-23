import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { RootStore } from '@store';
import CommentMore from './CommentMore';
import useStores from '../../../stores/useStores';
import CommentRow from './CommentRow';
import CommentNone from './CommentNone';

const CommentList = () => {
  const { CommentStore } = useStores() as RootStore;
  const { commentList, commentSize } = CommentStore;

  let isMoreComment = false;
  if (commentList.length && commentList[0].total > commentSize) {
    isMoreComment = true;
  }

  return (
    <CommentListWrapper>
      <ul>
        {commentList.length ? commentList.map(
          (data) => <CommentRow data={data} key={data.id} />,
        ) : <CommentNone />}
        {isMoreComment && <CommentMore />}
      </ul>
    </CommentListWrapper>
  );
};

const CommentListWrapper = styled.div`
  & > ul {
    list-style: none;
  }
`;

export default observer(CommentList);
