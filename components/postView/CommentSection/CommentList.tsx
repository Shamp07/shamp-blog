import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import CommentRow, { CommentRowInterface } from './CommentRow';
import CommentNone from './CommentNone';
import CommentMore from './CommentMore';

const CommentList: React.FC = () => {
  const { CommentStore } = useStores();
  const { commentList, commentSize } = CommentStore;

  let isMoreComment = false;
  if (commentList.length && commentList[0].total > commentSize) {
    isMoreComment = true;
  }

  return (
    <CommentListWrapper>
      <ul>
        {commentList.length ? commentList.map(
          (data: CommentRowInterface) => <CommentRow data={data} key={data.id} />,
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
