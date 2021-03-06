import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import CommentMore from './CommentMore';
import CommentRow from './CommentRow';
import CommentNone from './CommentNone';

const CommentList = () => {
  const { CommentStore } = useStores();
  const { commentList, commentSize } = CommentStore;

  const isMoreComment = commentList[0]?.total > commentSize;

  const comments = useMemo(() => (
    commentList.length ? commentList.map(
      (data) => <CommentRow data={data} key={data.id} />,
    ) : <CommentNone />
  ), [commentList]);

  return (
    <CommentListWrapper>
      <ul>
        {comments}
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
